describe('End-to-End Prediction Test', () => {
  it('should submit champion stats and get a prediction', () => {
    cy.visit('http://localhost:3000'); // ton URL React

    cy.get('#pred').click();

    // Remplir les champs
    cy.get('#hp_base').type('600');
    cy.get('#mp_base').type('300');
    cy.get('#arm_base').type('35');
    cy.get('#mr_base').type('32');
    cy.get('#dam_base').type('55');
    cy.get('#range').type('melee'); // ou .type('0') selon l’implémentation
    cy.get('#mobility').type('3');

    // Soumettre
    cy.get('#predict_btn').click();

    // Vérifie la réponse
    cy.get('#predict_result')
      .should('be.visible')
      .and('contain.text', 'Champion type predicted:')
  });
});