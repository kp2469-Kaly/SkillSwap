public class Review {
    private UUID id;
    private int rating;
    private String comment;
    private User reviewer;

    public void editReview(int rating, String comment) {
        this.rating = rating;
        this.comment = comment;
    }
}
