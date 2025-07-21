public class ExpertSession extends Session {
    private double price;
    private String paymentStatus;
    private String topic;

    public boolean processPayment() { /* logic */ return true; }
    public String generateInvoice() { return "Invoice#" + UUID.randomUUID(); }
}
