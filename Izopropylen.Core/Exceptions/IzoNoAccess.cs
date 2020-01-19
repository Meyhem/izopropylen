namespace Izopropylen.Core.Exceptions
{
    [System.Serializable]
    public class IzoNoAccessException : IzoBaseException
    {
        public IzoNoAccessException() { }
        public IzoNoAccessException(string message) : base(message) { }
        public IzoNoAccessException(string message, System.Exception inner) : base(message, inner) { }
        protected IzoNoAccessException(
            System.Runtime.Serialization.SerializationInfo info,
            System.Runtime.Serialization.StreamingContext context) : base(info, context) { }
    }
}