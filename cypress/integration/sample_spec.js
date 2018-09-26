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


describe('finds Login button', function(){
    it('finds the login button', function(){
        cy.visit(`https://www.whosbringingwhat.org/`)
        cy.get('.app_nav_container.big > .nav_parent > .big > [data-cy=login1]')  
    })
})

describe('finds About button', function(){
    it('finds the about button', function(){
        cy.visit(`https://www.whosbringingwhat.org/`)
        cy.get('.app_nav_container.big > .nav_parent > .big > [data-cy=About]')
        
    })
})

describe('goes to About page', function(){
    it('clicks About button', function(){
        cy.visit(`https://www.whosbringingwhat.org/`)
        cy.get('.app_nav_container.big > .nav_parent > .big > [data-cy=About]')
        .click()
        
    })
})



describe('LinkedIns', function() {
    it('finds Andrews Linkedin link', function(){
        cy.visit(`https://www.whosbringingwhat.org/`)
        cy.get('.app_nav_container.big > .nav_parent > .big > [data-cy=About]')
        .click()
        cy.get('.big > .about_people_container > :nth-child(2) > .about_linkedin > a')
    })
    it('finds Zaks LinkedIn link', function(){
        cy.visit(`https://www.whosbringingwhat.org/about`)
        cy.get('.big > .about_people_container > :nth-child(3) > .about_linkedin > a')
    })
    it('finds danielles LinkedIn', function(){
        cy.visit(`https://www.whosbringingwhat.org/`)
        cy.get('.app_nav_container.big > .nav_parent > .big > [data-cy=About]')
        .click()
        cy.get('.big > .about_people_container > :nth-child(1) > .about_linkedin > a')
    })

})


describe ('find Githubs', function() {
    it('find Danielles github', function() {
        cy.visit(`https://www.whosbringingwhat.org/about`)
        cy.get('.big > .about_people_container > :nth-child(1) > .about_github > a')
        cy.request('https://github.com/DanielleLyn')
    })
    it('finds Andrews Github link', function(){
        cy.visit(`https://www.whosbringingwhat.org/`)
        cy.get('.app_nav_container.big > .nav_parent > .big > [data-cy=About]')
        .click()
        cy.get('.big > .about_people_container > :nth-child(2) > .about_github > a')  
        cy.request('https://github.com/Clayakn')
    })
    it('finds Zaks Github link', function(){
        cy.visit(`https://www.whosbringingwhat.org/about`)
        cy.get('.big > .about_people_container > :nth-child(3) > .about_github > a')
        cy.request('https://github.com/Zakery1')
    })
})














