public class Message {
    private UUID id;
    private User sender;
    private User receiver;
    private String content;
    private Date timestamp;
    private boolean read;

    public Message(User sender, User receiver, String content) {
        this.sender = sender;
        this.receiver = receiver;
        this.content = content;
        this.timestamp = new Date();
    }

    public void markAsRead() { read = true; }
}
