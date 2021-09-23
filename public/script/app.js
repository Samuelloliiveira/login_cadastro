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

const loginForm = {

  email: document.getElementById('email'),
  password: document.getElementById('password'),

  existsUsers(emailLogin, passwordLogin) {
 
    const dataStorage = Storage.get()

    for(users of dataStorage) {
      
      if (
        emailLogin === String(users.email) &
        passwordLogin === String(users.password)
      ) {

        window.location.replace('/paginaInicial.html')

      }else {
        alert('Error')
      }
    
    }
   
  },

  login(event) {
    event.preventDefault()//Não passa valores pela url

    const emailLogin = loginForm.email.value
    const passwordLogin = loginForm.password.value

    try {
      
      loginForm.existsUsers(emailLogin,passwordLogin)

    } catch (error) {
      alert(error.message)
    }

  }

}

// const directPage = {
//   userPage() {
// 
//     //Direciona página
//     window.location.replace('/paginaInicial.html')
// 
//     //Pega o p da página inicial
//     const user = document.querySelector('.userPage p')
// 
// 
//     
//   },
// }

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

  checkEmailExists(email) {

    const dataStorage = Storage.get()

    for(users of dataStorage) {
      if (email === users.email) {
        throw new Error('Email já cadastrado!')
      }
    }
  },

  validatePassword(password) {
    
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/

    if (passwordRegex.test(String(password)) == false) {
      throw new Error('A senha deve atender aos requisitos!')
    }
  },

  validateFields() {
      
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

  //aqui ele retorna somente os dados validos para cadastro
  returnsvalidData() {

    const {
      name, 
      lastName, 
      email, 
      password
    } = registrationForm.getValues()

    return {name, lastName, email, password}
  },

  submit(event) {//submeter o formulário
    event.preventDefault()//Não passa valores pela url

    const dataUsers = registrationForm.returnsvalidData()

    const email = registrationForm.returnsvalidData().email
    const password = registrationForm.returnsvalidData().password

    try {

      registrationForm.validateFields()
      registrationForm.checkEmailExists(email)
      registrationForm.validatePassword(password)
      registrations.add(dataUsers)
      // directPage.userPage()

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

//o local storage vai começar vazio
app.init()

//ABRIR TELA DE INICIO E COLOCAR O NOME DA PESSOA
//FAZER O LOGIM