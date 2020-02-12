<?php
/* Шаблон листа
------------------------------------------------------- */
function templateMail($body) {
	
	if(mb_substr(PHP_OS, 0, 3) == "WIN") {
		$n = "\r\n";
	} else {
		$n = "\n";
	}

	$message = "<html>". $n;
	$message .= "<head></head>". $n;
	$message .= "<body>". $n;
	$message .= $body;
	$message .= "</body>". $n; 
	$message .= "</html>";
	
	return $message;
}


class mMail {

  private $from;
  private $from_name = "";
  private $type = "text/html";
  private $encoding = "utf-8";
  private $notify = false;

  /* Конструктор приймає зворотню e-mail адресу */
  public function __construct($from) {
    $this->from = $from;
  }

  /* Зміна зворотньої e-mail адреси */
  public function setFrom($from) {
    $this->from = $from;
  }

  /* Зміна імені в зворотній адресі */
  public function setFromName($from_name) {
    $this->from_name = $from_name;
  }

  /* Зміна типу вмісту листа */
  public function setType($type) {
    $this->type = $type;
  }

  /* Чи потрібно запитувати підтвердження листа */
  public function setNotify($notify) {
    $this->notify = $notify;
  }

  /* Зміна кодування листа */
  public function setEncoding($encoding) {
    $this->encoding = $encoding;
  }

  /* Метод відправлення листа */
  public function send($to, $subject, $message) {
    $from = "=?utf-8?B?".base64_encode($this->from_name)."?="." <".$this->from.">"; // Кодуємо зворотню адресу (щоб уникнути проблем з кодуванням)
    $headers = "From: ".$from."\r\nReply-To: ".$from."\r\nContent-type: ".$this->type."; charset=".$this->encoding."\r\n"; // Встановлюємо необхідні заголовки листа
    if ($this->notify) $headers .= "Disposition-Notification-To: ".$this->from."\r\n"; // Додаємо запит підтвердження отримання листа, якщо потрібно
    $subject = "=?utf-8?B?".base64_encode($subject)."?="; // Кодуємо тему (щоб уникнути проблем з кодуванням)
    return mail($to, $subject, $message, $headers); // Відправляємо лист і повертаємо результат
  }

}