<template>
    <form id="contact-form" class="text-sm mt-0">
        <div class="flex flex-col">
            <label for="name" class="mb-3">_name:</label>
            <input type="text" id="name-input" name="name" :placeholder="name" class="p-2 mb-5 placeholder-slate-600"
                required>
        </div>
        <div class="flex flex-col">
            <label for="email" class="mb-3">_email:</label>
            <input type="email" id="email-input" name="email" :placeholder="email"
                class="p-2 mb-5 placeholder-slate-600" required>
        </div>
        <div class="flex flex-col">
            <label for="message" class="mb-3">_message:</label>
            <textarea id="message-input" name="message" :placeholder="message" class="placeholder-slate-600"
                style="height: 90%;" required></textarea>
        </div>
        <button id="submit-button" type="button" @click="sendMessage()"
            class="py-2 px-4 mt-0 mb-6">submit-message</button>
    </form>
</template>

<style>
.custom-swal-background {
    background-color: transparent;
    /* Définir la couleur de fond du Swal */
}

.swal2-title {
    color: #659ABD;
        /* Couleur du texte personnalisée */
}
</style>


<script>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import Swal from 'sweetalert2';





export default {
    name: 'ContactForm',
    data() {
        return {
            isLoading: false,
            fullPage: true
        }
    },
    props: {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        }
    },
    methods: {
        sendMessage() {
            const name = document.querySelector('input[name="name"]').value;
            const email = document.querySelector('input[name="email"]').value;
            const message = document.querySelector('textarea[name="message"]').value;

            console.log(name, email, message);
            //check is the data is not null
            if (name != "" && email != "" && message != "") {
                //check if the email syntaxe is correct
                if (email.includes('@') && email.includes('.')) {
                    // put them on form data
                    const formData = new FormData();
                    formData.append('name', name);
                    formData.append('email', email);
                    formData.append('message', message);


                    //loader mon pote
                    Swal.fire({
                        title: "Chargement en cours...",
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        showConfirmButton: false,
                        html: `
                            <div style="display:flex; justify-content:center;">
                                <img src="/pika.gif" alt="Loading..." />
                            </div>`,
                        background: 'transparent', // Fond transparent
                        backdrop: 'rgba(0, 0, 0, 0.5)', // Fond transparent et flou
                        customClass: {
                            popup: 'custom-swal-background no-border', // Utiliser la classe de style personnalisée pour la couleur de fond et supprimer la bordure
                        }
                    });




                    //post them using fetch post 
                    fetch('https://porfolio-backend-api.onrender.com/api/sendmail', {
                        method: 'POST',
                        body: formData
                    }).then(response => response.json())
                        .then(data => {
                            //close the loader
                            Swal.close();
                            // Traiter la réponse JSON
                            toast(data.message, {
                                "theme": "auto",
                                "type": "success",
                                "transition": "slide",
                                "dangerouslyHTMLString": true
                            })
                            console.log(data); // Affiche les données de la réponse
                        });
                }
                else {
                    toast("Veuillez entrer une adresse email valide", {
                        "theme": "auto",
                        "type": "warning",
                        "transition": "flip",
                        "dangerouslyHTMLString": true
                    })
                }

            }
            else {
                toast("Veuillez remplir tous les champs", {
                    "theme": "auto",
                    "type": "warning",
                    "transition": "flip",
                    "dangerouslyHTMLString": true
                })
                // console.log('Veuillez remplir tous les champs');
            }
        },
        mounted() {
            document.getElementById("contact-form").addEventListener("submit", function (event) {
                event.preventDefault();
                const name = document.querySelector('input[name="name"]').value;
                const email = document.querySelector('input[name="email"]').value;
                const message = document.querySelector('textarea[name="message"]').value;

                // Here the code to send the email

            });
        }
    }
}
</script>

<style>
form {
    @apply font-fira_retina text-menu-text
}

input {
    background-color: #011221;
    border: 2px solid #1E2D3D;
    border-radius: 7px;

}

/* Change Autocomplete styles in Chrome*/
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
    -webkit-text-fill-color: rgb(190, 190, 190);
    transition: background-color 5000s ease-in-out 0s;
    border: 2px solid #607b96;
}

#message-input {
    background-color: #011221;
    border: 2px solid #1E2D3D;
    border-radius: 7px;
    resize: none;
    height: 150px;
    padding: 10px;
}

#submit-button {
    @apply font-fira_retina text-white text-sm;
    background-color: #1E2D3D;
    border-radius: 7px;
    margin-top: 20px;
    cursor: pointer;
}

#submit-button:hover {
    background-color: #263B50;
}

input:focus,
#message-input:focus {
    outline: none;
    transition: none;
    border: 2px solid #607b96;
    box-shadow: #607b9669 0px 0px 0px 2px;
}

#contact-form {
    max-width: 370px;
    width: 100%;
}

@media (max-width: 1920px) {
    #contact-form {
        max-width: 320px;
        max-height: 400px;
    }

    #submit-button {
        /* width: 100%; */
        font-size: 12px;
    }

    textarea {
        font-size: 13px;
        max-height: 130px !important;
    }

    input {
        font-size: 13px;
    }
}
</style>