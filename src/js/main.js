/**
 * Module depedencies.
 */

var $ = window.$ = window.jQuery = require('jquery')
require('jquery-validation')

/**
 * Validation.
 */

// Use the code below to translate the default messages.
$.extend($.validator.messages, {
  required: 'Campo obrigatório',
  email: 'E-mail inválido'
})

$('.js-validate').validate()
