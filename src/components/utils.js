import{handleCloseEscape, closePopupOverlay} from './modal'

export function changeLoading(button, isLoading, buttonText, loadingText = 'Сохранение...'){
  if(isLoading) {
    button.textContent = loadingText
} else {
    button.textContent = buttonText
}
}