namespace Izopropylen.Core.Exceptions
{
    
    [System.Serializable]
    public class IzoNotFoundException : IzoBaseException
    {
        public IzoNotFoundException() { }
        public IzoNotFoundException(string message) : base(message) { }
        public IzoNotFoundException(string message, System.Exception inner) : base(message, inner) { }
        protected IzoNotFoundException(
            System.Runtime.Serialization.SerializationInfo info,
            System.Runtime.Serialization.StreamingContext context) : base(info, context) { }
    }
}