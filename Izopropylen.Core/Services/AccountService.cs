using System;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Izopropylen.Core.Exceptions;
using Izopropylen.Core.Interfaces;
using Izopropylen.Data.Entity;
using Izopropylen.Data.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Izopropylen.Core.Services
{
    public class AccountService : IAccountService
    {
        private readonly IRepository<Account> accRepo;

        public AccountService(IRepository<Account> accRepo)
        {
            this.accRepo = accRepo;
        }

        public async Task<int> AddAccount(string username,
            string password,
            string displayname)
        {
            var existing = await accRepo.Query()
                .SingleOrDefaultAsync(acc => acc.Username == username);

            if (existing != null) {
                throw new IzoConflictException("Account with this username already exist");
            }

            var newAcc = new Account
            {
                Username = username,
                Displayname = displayname,
                PasswordHash = DeriveKey(password, GenSalt())
            };

            await accRepo.Create(newAcc);

            return newAcc.Id;
        }

        public async Task<Account> GetAccount(int id)
        {
            var account = await accRepo.FindOne(id);

            if (account == null)
            {
                throw new IzoConflictException("No such account");
            }

            return account;
        }

        public async Task<Account> AutheticateUser(string username, string password)
        {
            var account = await accRepo.Query()
                .SingleOrDefaultAsync(acc => acc.Username == username);

            if (account == null)
            {
                throw new IzoNotFoundException("No such account");
            }

            if (!VerifyHash(account.PasswordHash, password))
            {
                throw new IzoNotFoundException("No such account");
            }

            return account;
        }

        public string CreateHash(string password)
        {
            var salt = GenSalt();

            return DeriveKey(password, salt);
        }

        public bool VerifyHash(string hash, string password)
        {
            var components = hash.Split('|');
            if (components.Length != 2)
            {
                throw new ArgumentException("Hash is not in required format");
            }
            return hash == DeriveKey(password, components[0]);
        }

        #region Privates
        private string GenSalt()
        {
            byte[] randomBytes = new byte[128 / 8];
            using var generator = RandomNumberGenerator.Create();
            generator.GetBytes(randomBytes);
            return Convert.ToBase64String(randomBytes);
        }

        private string DeriveKey(string password, string salt)
        {
            var derivation = new Rfc2898DeriveBytes(password, Encoding.UTF8.GetBytes(salt), 10000);
            var valueBytes = derivation.GetBytes(256/8);

            return $"{salt}|{Convert.ToBase64String(valueBytes)}";
        }
        #endregion
    }
}