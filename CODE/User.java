public class User {
    private UUID id;
    private String name;
    private String email;
    private String password;
    private String bio;
    private Profile profile;
    private Location location;

    public boolean register() { /* logic */ return true; }
    public boolean login(String email, String password) { /* logic */ return true; }
    public void updateProfile(Profile profile) { this.profile = profile; }
    public Message sendMessage(User to, String content) { return new Message(this, to, content); }
    public boolean scheduleSession(Session session) { /* logic */ return true; }
    public void giveReview(Session session, Review review) { session.setReview(review); }
}
