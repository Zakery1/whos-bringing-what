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
        cy.get('.App_navContainer.big > .Nav_parent > .big > [data-cy=Feed]')
        
    })
})
describe('clicks Feed button', function(){
    it('clicks the Feed button', function(){
        cy.visit(`https://www.whosbringingwhat.org/`)
        cy.get('.App_navContainer.big > .Nav_parent > .big > [data-cy=Feed]')
        .click()
    })
})

describe('finds Login button', function(){
    it('finds the login button', function(){
        cy.visit(`https://www.whosbringingwhat.org/`)
        cy.get('.App_navContainer.big > .Nav_parent > .big > [data-cy=login1]')  
    })
})

describe('clicks Login button', function(){
    it('finds and clicks the login button', function(){
        cy.visit(`https://www.whosbringingwhat.org/`)
        cy.get('.App_navContainer.big > .Nav_parent > .big > [data-cy=login1]')
        .click()
    })
})

describe('finds About button', function(){
    it('finds the about button', function(){
        cy.visit(`https://www.whosbringingwhat.org/`)
        cy.get('[data-cy=About]')
        
    })
})

describe('goes to About page', function(){
    it('clicks About button', function(){
        cy.visit(`https://www.whosbringingwhat.org/`)
        cy.get('.App_navContainer.big > .Nav_parent > .big > [data-cy=About]')
        .click()
        
    })
})



describe('LinkedIns', function() {
    it('finds Andrews Linkedin link', function(){
        cy.visit(`https://www.whosbringingwhat.org/`)
        cy.get('.App_navContainer.big > .Nav_parent > .big > [data-cy=About]')
        .click()
        cy.get('.big > .About_peopleContainer > :nth-child(2) > .About_linkedin > a')
    })
    it('finds Zaks LinkedIn link', function(){
        cy.visit(`https://www.whosbringingwhat.org/about`)
        cy.get('.big > .About_peopleContainer > :nth-child(3) > .About_linkedin > a')
    })
    it('finds danielles LinkedIn', function(){
        cy.visit(`https://www.whosbringingwhat.org/`)
        cy.get('.App_navContainer.big > .Nav_parent > .big > [data-cy=About]')
        .click()
        cy.get('.big > .About_peopleContainer > :nth-child(1) > .About_linkedin > a')
    })

})


describe ('find Githubs', function() {
    it('find Danielles github', function() {
        cy.visit(`https://www.whosbringingwhat.org/about`)
        cy.get('.big > .About_peopleContainer > :nth-child(1) > .About_github > a')
        cy.request('https://github.com/DanielleLyn')
    })
    it('finds Andrews Github link', function(){
        cy.visit(`https://www.whosbringingwhat.org/`)
        cy.get('.App_navContainer.big > .Nav_parent > .big > [data-cy=About]')
        .click()
        cy.get('.big > .About_peopleContainer > :nth-child(2) > .About_github > a')  
        cy.request('https://github.com/Clayakn')
    })
    it('finds Zaks Github link', function(){
        cy.visit(`https://www.whosbringingwhat.org/about`)
        cy.get('.big > .About_peopleContainer > :nth-child(3) > .About_github > a')
        cy.request('https://github.com/Zakery1')
    })
})














