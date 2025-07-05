describe('End-to-End Prediction Test', () => {
  it('should submit champion stats and get a prediction', () => {
    cy.visit('http://localhost:3000'); // ton URL React

    // Remplir les champs
    cy.get('[data-cy=hp_base]').type('600');
    cy.get('[data-cy=mp_base]').type('300');
    cy.get('[data-cy=arm_base]').type('35');
    cy.get('[data-cy=mr_base]').type('32');
    cy.get('[data-cy=dam_base]').type('55');
    cy.get('[data-cy=range]').select('Melee'); // ou .type('0') selon l’implémentation
    cy.get('[data-cy=mobility]').type('3');

    // Soumettre
    cy.get('[data-cy=submit-btn]').click();

    // Vérifie la réponse
    cy.get('[data-cy=prediction-result]')
      .should('be.visible')
      .and('contain.text', 'Predicted herotype:')
  });
});