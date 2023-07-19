export class Dialog {
  private static _instance: Dialog;
  private static _dialogElement: HTMLDialogElement;

  public static get Instance() {
    if (!Dialog._instance) {
      Dialog._instance = new Dialog();
    }
    return Dialog._instance;
  }

  public static get DialogElement() {
    if (!Dialog._dialogElement) {
      Dialog._dialogElement = document.getElementById(
        "onLoadSignupPopup"
      ) as HTMLDialogElement;
    }

    return Dialog._dialogElement;
  }

  public static initilaiseSignUpDialog() {
    const closeBtn = document.getElementById("loadSignupPopupCloseButton");
    const dialogSubscribeButton = document.getElementById('sib-form') as HTMLFormElement;

    dialogSubscribeButton.addEventListener('submit', (event) => {
      event.preventDefault();
      localStorage.setItem("dialogClosedByUser", "true");
      Dialog.DialogElement.close();
    })

    closeBtn.addEventListener("click", () => {
      sessionStorage.setItem("dialogClosedByUser", "true");
      Dialog.DialogElement.close();
    });

    setTimeout(() => {
      Dialog.DialogElement.showModal();
    }, 2000);
  }
}
