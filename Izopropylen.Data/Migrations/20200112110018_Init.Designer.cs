﻿// <auto-generated />
using Izopropylen.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Izopropylen.Data.Migrations
{
    [DbContext(typeof(IzoDbContext))]
    [Migration("20200112110018_Init")]
    partial class Init
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.0");

            modelBuilder.Entity("Izopropylen.Data.Entity.Account", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("TEXT");

                    b.Property<string>("Username")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("Username")
                        .IsUnique();

                    b.ToTable("Accounts");
                });

            modelBuilder.Entity("Izopropylen.Data.Entity.AccountProject", b =>
                {
                    b.Property<int>("AccountId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("ProjectId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("ProjectAccountRole")
                        .HasColumnType("INTEGER");

                    b.HasKey("AccountId", "ProjectId");

                    b.HasIndex("ProjectId");

                    b.ToTable("AccountProjects");
                });

            modelBuilder.Entity("Izopropylen.Data.Entity.Project", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Projects");
                });

            modelBuilder.Entity("Izopropylen.Data.Entity.TranslationKey", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("CultureCode")
                        .HasColumnType("TEXT");

                    b.Property<string>("Key")
                        .HasColumnType("TEXT");

                    b.Property<int>("ProjectId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("ProjectId");

                    b.ToTable("TranslationKey");
                });

            modelBuilder.Entity("Izopropylen.Data.Entity.TranslationValue", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("TranslationKeyId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Value")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("TranslationKeyId");

                    b.ToTable("TranslationValue");
                });

            modelBuilder.Entity("Izopropylen.Data.Entity.AccountProject", b =>
                {
                    b.HasOne("Izopropylen.Data.Entity.Account", "Account")
                        .WithMany("Projects")
                        .HasForeignKey("AccountId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Izopropylen.Data.Entity.Project", "Project")
                        .WithMany("Collaborators")
                        .HasForeignKey("ProjectId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Izopropylen.Data.Entity.TranslationKey", b =>
                {
                    b.HasOne("Izopropylen.Data.Entity.Project", "Project")
                        .WithMany("TranslationKeys")
                        .HasForeignKey("ProjectId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Izopropylen.Data.Entity.TranslationValue", b =>
                {
                    b.HasOne("Izopropylen.Data.Entity.TranslationKey", "TranslationKey")
                        .WithMany("Values")
                        .HasForeignKey("TranslationKeyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
