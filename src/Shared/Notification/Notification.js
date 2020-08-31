import { success, error } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";

const Notification = (type, title, text, delay) => {

  type === 'success' ? success({
    title: title,
    text: text,
    delay: delay,
    addClass: 'NOTFICATION'
  }) :
    error({
      title: title,
      text: text,
      delay: delay,
      addClass: 'NOTFICATION'
    })
}
export default Notification