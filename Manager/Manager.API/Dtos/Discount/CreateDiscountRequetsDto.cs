namespace Manager.API.Dtos.Discount
{
    public class CreateDiscountRequetsDto
    {
        public string Name { get; set; }
        public string DiscountType { get; set; }
        public float DiscountValue { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public bool IsActive { get; set; }
    }
}
