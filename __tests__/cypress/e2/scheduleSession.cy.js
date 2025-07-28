describe('Skill Session Scheduling Flow', () => {
  it('should let learner schedule a session with a teacher', () => {
    cy.visit('http://localhost:3000/login');

    cy.get('input[name="email"]').type('learner@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    cy.contains('Browse Skills').click();
    cy.get('.skill-card').first().click();
    cy.contains('Schedule Session').click();

    cy.get('input[type="datetime-local"]').type('2025-08-06T14:00');
    cy.contains('Confirm').click();

    cy.contains('Session successfully scheduled').should('be.visible');
  });
});
