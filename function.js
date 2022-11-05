// ***store datalist迴圈
// 由此新增store
const storelist = ["store1", "store2", "store3", "store4", "store5"];

for (i = 0; i < storelist.length; i++) {
  $("#myform #stores").append(
    `<option class="formText item${i + 1}">${storelist[i]}</option>`
  );
}

// ***表單驗證
// 錯誤訊息於提交btn下方顯示
const formSummit = Vue.createApp({
  data() {
    return {
      // ***表單
      // 內容及驗證
      store: { input: "", errorMsg: "", failBorder: false },

      name: { input: "", errorMsg: "" , failBorder: false},

      phone: { input: "", errorMsg: "", failBorder: false},

      consumption: { input: "", errorMsg: "", failBorder: false},

      payment: { input:"", errorMsg: "", failBorder: false},


      // 提交按鈕樣式
      submitBtnStyle: {
        text: "Submit",
      },
    };
  },

  methods: {
    onSubmit() {
      // ***機制: 先判斷input是否為空值, 在判斷格式是否錯誤並顯示訊息

      // ***store比對
      if (this.store.input != "") {
        this.store.failBorder = false;
        if ($.inArray(this.store.input, storelist) == -1) {
          this.store.errorMsg = "no result 查無此店";
          this.store.failBorder = true;
        } else {
          this.store.errorMsg = "";
          this.store.failBorder = false;
        }
      } else {
        this.store.errorMsg = "required";
        this.store.failBorder = true;
      }

      // ***name中英驗證
      if (this.name.input != "") {
        this.name.failBorder = false;
        const name_regularExp = /[\a-\z\A-\Z\u4E00-\u9FA5]/;
        if (!name_regularExp.test(this.name.input)) {
          this.name.errorMsg = "wrong format 請填入中文或英文";
          this.name.failBorder = true;
        } else {
          this.name.errorMsg = "";
          this.name.failBorder = false;
        }
      } else {
        this.name.errorMsg = "required";
        this.name.failBorder = true;
      }

      // ***phone格式驗證
      if (this.phone.input != "") {
        const phone_regularExp = /09[0-9]{8}$/;
        this.phone.failBorder = false;
        if (!phone_regularExp.test(this.phone.input)) {
          this.phone.errorMsg = "wrong format 請填入正確電話格式";
          this.phone.failBorder = true;
        } else {
          this.phone.errorMsg = "";
          this.phone.failBorder = false;
        }
      } else {
        this.phone.errorMsg = "required";
        this.phone.failBorder = true;
      }


      // ***consumption格式驗證
      if (this.consumption.input != "") {
        const consumption_regularExp = /[0-9]/;
        this.consumption.failBorder = false;
      if (
        consumption_regularExp.test(this.consumption.input) && this.consumption.input >= 0 ) {
        this.consumption.errorMsg = "";
        this.consumption.failBorder = false;
      } else {
        this.consumption.errorMsg = "wrong format 請填入數字且不可小於0";
        this.consumption.failBorder = true;
      }
        } else {
        this.consumption.errorMsg = "required";
        this.consumption.failBorder = true;
      }

      // ***payment格式驗證
      if (this.payment.input != "") {
        this.payment.failBorder = false;
        this.payment.errorMsg = "";
      } else {
        this.payment.errorMsg = "required";
        this.payment.failBorder = true;
      }


      

      // ***驗證成功後送出表單
      // --提交按鈕內文字及樣式
      this.submitBtnStyle.text = "Fail";
      $("#formSubmit .submitBtnFont").css("color", "#FFE3E3");

      if (// 如果沒有錯誤訊息則送出表單
        this.store.errorMsg + this.name.errorMsg + this.phone.errorMsg + this.consumption.errorMsg + this.payment.errorMsg =="") {
        $.post("./api檔案(暫無)", {
          store: this.store.input,
          name: this.name.input,
          phone: this.phone.input,
          consumption: this.consumption.input,
          payment: this.payment.input,
        });

        // 提交按鈕內文字及樣式
        this.submitBtnStyle.text = "Success";
        $("#formSubmit .submitBtnFont").css("color", "#E6FFB1");

      }
    },
  },
});
formSummit.mount("#formSubmit");
