public class Profile {
    private String availability;
    private String meetingPreferences;
    private List<Skill> skillsOffered = new ArrayList<>();
    private List<Skill> skillsWanted = new ArrayList<>();

    public void addSkillToTeach(Skill skill) { skillsOffered.add(skill); }
    public void addSkillToLearn(Skill skill) { skillsWanted.add(skill); }
    public void updateAvailability(String availability) { this.availability = availability; }
}
