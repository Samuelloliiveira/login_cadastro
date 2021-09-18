const Storage = {
  get() {
    /* O método JSON.parse() analisa uma string JSON, construindo o valor 
    ou um objeto JavaScript descrito pela string. */
    return JSON.parse(localStorage.getItem("registration")) || []
  },

  //Setando os dados para o local storage
  set(userData) {
    localStorage.setItem("registration",
    //O método JSON.stringify() converte valores em javascript para uma String  JSON.
    JSON.stringify(userData))
  }
}

const registrations = {
    
  users: Storage.get(),

  add(newUser) {
    registrations.users.push(newUser)
    app.init()
  }

}

const registrationForm = {

  name: document.getElementById('name'),
  lastName: document.getElementById('lastName'),
  email: document.getElementById('email'),
  password: document.getElementById('password'),
  confirmPassword: document.getElementById('confirmPassword'),

  getValues() {
      return {
        name: registrationForm.name.value,
        lastName: registrationForm.lastName.value,
        email: registrationForm.email.value,
        password: registrationForm.password.value,
        confirmPassword: registrationForm.confirmPassword.value,
      }
  },

  ValidData() {
      const {
        name, 
        lastName, 
        email, 
        password, 
        confirmPassword
      } = registrationForm.getValues()

      if(
        name === '' ||
        lastName === '' ||
        email === '' ||
        password === '' ||
        confirmPassword === '') {
          throw new Error('Preencha todos os campos')
      }if(confirmPassword != password) {
        throw new Error('As senhas não coincidem!')
      }

  },

  submit(event) {//submeter o formulário

    event.preventDefault()//Não passa valores pela url

    try {
      
      registrationForm.ValidData()
      registrations.add(registrationForm.getValues())

    } catch (error) {
      alert(error.message)
    }

  }
}

const app = {
  init() {
    Storage.set(registrations.users)
  }
}

//NÃO PRECISA PASSAR O CONFIRM SENHA
//ABRIR TELA DE INICIO E COLOCAR O NOME DA PESSOA
//FAZER O LOGIM
//ADICIONAR SEMANTICA
//NÃO CADASTRAR O MESMO EMAIL
