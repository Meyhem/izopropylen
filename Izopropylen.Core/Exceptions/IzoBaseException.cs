namespace Izopropylen.Core.Exceptions
{
    [System.Serializable]
    public class IzoBaseException : System.Exception
    {
        public IzoBaseException() { }
        public IzoBaseException(string message) : base(message) { }
        public IzoBaseException(string message, System.Exception inner) : base(message, inner) { }
        protected IzoBaseException(
            System.Runtime.Serialization.SerializationInfo info,
            System.Runtime.Serialization.StreamingContext context) : base(info, context) { }
    }
}