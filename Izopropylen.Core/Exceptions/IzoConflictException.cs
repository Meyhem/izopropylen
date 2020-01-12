namespace Izopropylen.Core.Exceptions
{
    [System.Serializable]
    public class IzoConflictException : IzoBaseException
    {
        public IzoConflictException() { }
        public IzoConflictException(string message) : base(message) { }
        public IzoConflictException(string message, System.Exception inner) : base(message, inner) { }
        protected IzoConflictException(
            System.Runtime.Serialization.SerializationInfo info,
            System.Runtime.Serialization.StreamingContext context) : base(info, context) { }
    }
}