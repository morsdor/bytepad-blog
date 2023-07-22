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
    const dialogSubscribeButton = document.getElementById(
      "sib-form"
    ) as HTMLFormElement;

    dialogSubscribeButton.addEventListener("submit", async (event) => {
      event.preventDefault();

      document.getElementById('sib-form-submit-button').innerText = 'SUBSCRIBING...'

      const target = event.target;

      const payLoad = {
        firstName: target[0].value,
        lastName: target[1].value,
        email: target[2].value,
      };

      try {
        const data = await fetch("https://api.bytepad.shop/new-contact", {
          method: "POST",
          body: JSON.stringify(payLoad),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (data.ok) {
          document.getElementById('sib-form-submit-button').innerText = 'SUBSCRIBED'
          localStorage.setItem("dialogClosedByUser", "true");
          setTimeout(() => Dialog.DialogElement.close(), 500);
          
        }
      } catch (err: any) {
        console.log(err);
      }
    });

    closeBtn.addEventListener("click", () => {
      sessionStorage.setItem("dialogClosedByUser", "true");
      Dialog.DialogElement.close();
    });

    setTimeout(() => {
      Dialog.DialogElement.showModal();
    }, 2000);
  }
}
