public interface ISessionStrategy {
    void schedule();
}

public class OnlineSession implements ISessionStrategy {
    public void schedule() {
        System.out.println("Scheduling online session...");
    }
}

public class OfflineSession implements ISessionStrategy {
    public void schedule() {
        System.out.println("Scheduling offline session at a location...");
    }
}

public class ExpertSession implements ISessionStrategy {
    public void schedule() {
        System.out.println("Scheduling paid expert session...");
    }
}

public class SessionContext {
    private ISessionStrategy strategy;

    public void setStrategy(ISessionStrategy strategy) {
        this.strategy = strategy;
    }

    public void schedule() {
        strategy.schedule();
    }
}
