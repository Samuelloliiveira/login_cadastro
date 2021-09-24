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

  existsUsers() {
 
    const dataStorage = Storage.get()

    arrayEmail = []
    arrayPassword = []
    arrayData = []

    for (let index = 0; index < dataStorage.length; index++) {

      // console.table(dataStorage[index])

      arrayEmail[index] = dataStorage[index].email
      arrayPassword[index] = dataStorage[index].password

      arrayData[index] = [arrayEmail[index], arrayPassword[index]]
    

      const arrayIndex = arrayData[index]

      console.table(arrayIndex)

      const email = arrayIndex[0].includes(loginForm.email.value)
      const password = arrayIndex[1].includes(loginForm.password.value)

      if (email == true & password == true){

        directPage.userPage()
      
      }else if(email == true & password == false){
        throw new Error('A senha esta incorreta!')
      }
      // else {
      //   throw new Error('Usuário não cadastrado!')
      // }

    }
  },

  ValidateFillLogin() {

    if (
      loginForm.email.value === '' ||
      loginForm.password.value === ''
    ){
      throw new Error('Preencha todos os campos')
    }
  },

  login(event) {
    event.preventDefault()//Não passa valores pela url

    try {
      
      loginForm.ValidateFillLogin()
      loginForm.existsUsers()

    } catch (error) {

      const message = String(error)

      const newError = message.replace('Error:', '')

      registrationForm.alert(newError)
    }

  }

}

const directPage = {
  userPage(name) {

    //Direciona para a página de usuário
    window.location.replace(`/paginaInicial.html?name=${name}`)

  },
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
        throw new Error('Preencha todos os campos!')
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

  removeAlert() {

    const divAlert = document.querySelector('.alert')

    /*para cara elemento error que tiver dentro de alert
    ele vai remover*/
    for (error of divAlert.children) {
        error.remove();
    }
  },

  alert(error) {
    const divAlert = document.querySelector('.alert')
    const existsP = document.querySelector('.alert p')
    const p = document.createElement('p')

    //recebendo erro
    p.innerHTML = error

    if (existsP == null) {
      divAlert.appendChild(p)
    }
    
    //Chama a função de remover alerta depois de um tempo
    setTimeout(function () {
      registrationForm.removeAlert()
    }, 1100)

  },
  
  submit(event) {//submeter o formulário
    event.preventDefault()//Não passa valores pela url

    const dataUsers = registrationForm.returnsvalidData()

    const email = registrationForm.returnsvalidData().email
    const password = registrationForm.returnsvalidData().password
    const name = registrationForm.returnsvalidData().name

    try {

      registrationForm.validateFields()
      registrationForm.checkEmailExists(email)
      registrationForm.validatePassword(password)
      registrations.add(dataUsers)
      directPage.userPage(name)

    } catch (error) {

      const message = String(error)

      const newError = message.replace('Error:', '')

      registrationForm.alert(newError)
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


//NÃO PERMITIR NAVEGAR PELA URL
//PASSAR O NOME DO USUÁRIO AO FAZER LOGIM
//NÃO PERMITIR USAR SENHA DE OUTRO USUÁRIO