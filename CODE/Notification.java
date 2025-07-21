public class Notification {
    private UUID id;
    private String title;
    private String message;
    private String status;

    public void markAsRead() { status = "read"; }
}
