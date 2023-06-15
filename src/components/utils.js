import{handleCloseEscape, closePopupOverlay} from './modal'
export function openPopup(popupName) {
    popupName.classList.add("popup_opened");
    document.addEventListener("keydown",handleCloseEscape);
    document.addEventListener('click', closePopupOverlay)
  }
export function closePopup(popupName) {
    popupName.classList.remove("popup_opened");
    document.removeEventListener("keydown", handleCloseEscape)
  }
export function changeLoading(button, isLoading, buttonText, loadingText = 'Сохранение...'){
  if(isLoading) {
    button.textContent = loadingText
} else {
    button.textContent = buttonText
}
}