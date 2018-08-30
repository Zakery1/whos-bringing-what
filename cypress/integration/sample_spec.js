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

// describe('finds Login button', function(){
//     it('finds the login button', function(){
//         cy.visit(`https://www.whosbringingwhat.org/`)
//         cy.get('.App_navContainer.big > .Nav_parent > .big > [href="/about"]')
        
//     })
// })

// describe('clicks Login button', function(){
//     it('clicks the login button', function(){
//         cy.visit(`https://www.whosbringingwhat.org/`)
//         cy.get('.App_navContainer.big > .Nav_parent > .big > button.Nav_desktopLink')
    
//     })
// })






describe('finds About button', function(){
    it('finds the About button', function(){
        cy.visit(`https://www.whosbringingwhat.org/`)
        cy.get('.App_navContainer.big > .Nav_parent > .big > [href="/about"]')
       
    })
})

describe('click Login button', function(){
    it('clicks the login button', function(){
        cy.visit(`https://www.whosbringingwhat.org/`)
        cy.get('body')
        cy.contains('Login').click()
    })
})


// describe('visits About page', function(){
//     it('visits About page', function (){
//         cy.visit(`https://www.whosbringingwhat.org/about`)
//     })
// })

