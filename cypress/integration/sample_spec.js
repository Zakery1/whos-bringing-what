describe('My First Test', function (){
    it ('Does not do much', function (){
        expect(true).to.equal(true)
    })
})

describe('Visit Page', function(){
  it('visits whos bringing what', function (){
      cy.visit(`https://www.whosbringingwhat.org/`)
  })
})
describe('finds Feed button', function(){
    it('finds the Feed button', function(){
        cy.visit(`https://www.whosbringingwhat.org/`)
        cy.get('.App_navContainer.small > .Nav_parent > .big > [data-cy=Feed]')
        
    })
})
describe('clicks Feed button', function(){
    it('clicks the Feed button', function(){
        cy.visit(`https://www.whosbringingwhat.org/`)
        cy.get('.App_navContainer.small > .Nav_parent > .big > [data-cy=Feed]')
        .click()
    })
})

describe('finds Login button', function(){
    it('finds the login button', function(){
        cy.visit(`https://www.whosbringingwhat.org/`)
        cy.get('.App_navContainer.small > .Nav_parent > .big > [data-cy=login1]')
        
    })
})

describe('finds About button', function(){
    it('finds the login button', function(){
        cy.visit(`https://www.whosbringingwhat.org/`)
        cy.get('[data-cy=About]')
        
    })
})

describe('goes to About page', function(){
    it('clicks About button', function(){
        cy.visit(`https://www.whosbringingwhat.org/`)
        cy.get('.App_navContainer.small > .Nav_parent > .big > [data-cy=About]')
        .click()
        
    })
})

describe('Finds Danielles Linkedin', function(){
    it('finds danielles button', function(){
        cy.visit(`https://www.whosbringingwhat.org/`)
        cy.get('.App_navContainer.small > .Nav_parent > .big > [data-cy=About]')
        .click()
        cy.get('.small > .About_peopleContainer > :nth-child(1) > .About_linkedin > a')
        
    })
})










