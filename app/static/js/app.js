/* Add your Application JavaScript */

const upload_form = ('upload-form', {
    name: 'upload_form',
    template: `
        <div>
            <h2> Form Upload </h2>
            <div>
                <div>
                    <ul v-if=''>
                        <li v-for="resp in response" class="alert alert-success" role='alert'>
                            {{ resp.message }}
                        </li>
                    </ul>
                    <ul v-else>
                        <li v-for="resp in error" class="alert alert-danger" role='alert'>
                            {{ resp.errors[0] }} <br>
                            {{ resp.errors[1] }}
                        </li>
                    </ul>
                </div>
                <form @submit.prevent='uploadPhoto' id = 'uploadForm' method = 'POST' enctype="multipart/form-data">
                    <div class='form-group'>
                        <label for = 'description'> Description </label>
                        <textarea type="text" name="description" id="uploadForm" class="form-control mb-2 mr-sm-2" style='min-height: 10rem; height:10rem;' placeholder="Enter description here"></textarea> 
                    </div>
                    <div>
                        <label for = 'photo'> Select a photo: </label> <br>
                        <input type='file' name = 'photo'> <br>
                    </div> <br>
                    <button class='btn bg-primary' type='submit'> Submit </button>
                </form>
            </div>
        </div>

    `,
    data() {
        return {
            response: [],
            error: []
        };
    },
    methods: {
        uploadPhoto: function() {
            let uploadForm = document.getElementById('uploadForm');
            let form_data = new FormData(uploadForm);

            fetch('/api/upload', {
                    method: 'POST',
                    body: form_data,
                    headers: {
                        'X-CSRFToken': token
                    },
                    credentials: 'same-origin'
                })
                .then(function(response) {
                    return response.json();
                })
                .then(function(jsonResponse) {
                    // display a success message
                    console.log(jsonResponse);
                    self.response = jsonResponse.result;
                    self.error = jsonResponse.errors;
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    }
});

// Instantiate our main Vue Instance
const app = Vue.createApp({
    data() {
        return {

        }
    },
    components: {
        'upload': upload_form
    }
});

app.component('app-header', {
    name: 'AppHeader',
    template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <a class="navbar-brand" href="#">Lab 7</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/">Home <span class="sr-only">(current)</span></router-link>
          </li>
          <li class="nav-item active">
            <router-link class="nav-link" to="/upload/">Upload Form </router-link>
          </li>
        </ul>
      </div>
    </nav>
    `
});

app.component('app-footer', {
    name: 'AppFooter',
    template: `
    <footer>
        <div class="container">
            <p>Copyright &copy; {{ year }} Flask Inc.</p>
        </div>
    </footer>
    `,
    data() {
        return {
            year: (new Date).getFullYear()
        }
    }
});

const Home = {
    name: 'Home',
    template: `
    <div class="jumbotron">
        <h1>Lab 7</h1>
        <p class="lead">In this lab we will demonstrate VueJS working with Forms and Form Validation from Flask-WTF.</p>
    </div>
    `,
    data() {
        return {}
    }
};

const NotFound = {
    name: 'NotFound',
    template: `
    <div>
        <h1>404 - Not Found</h1>
    </div>
    `,
    data() {
        return {}
    }
};

// Define Routes
const routes = [
    { path: "/", component: Home },
    // Put other routes here
    { path: "/upload/", component: upload_form },
    // This is a catch all route in case none of the above matches
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound }
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes, // short for `routes: routes`
});

app.use(router);

app.mount('#app');