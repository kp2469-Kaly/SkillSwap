public class Location {
    private String street;
    private String city;
    private String state;
    private double radius;

    public void update(String city, double radius) {
        this.city = city;
        this.radius = radius;
    }
}
