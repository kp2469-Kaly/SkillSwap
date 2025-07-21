public class Skill {
    private UUID id;
    private String name;
    private String category;
    private String expertiseLevel;
    private String description;

    public void editDetails(String name, String level) {
        this.name = name;
        this.expertiseLevel = level;
    }
}
