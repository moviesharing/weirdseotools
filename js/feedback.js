function updateStarRating(e) {
  var a = e.tool_rating; if (0 != a) {
    $(".avg_rating_score").text(e.tool_rating.toFixed(1)),
    $(".tool_total_reviews").text(e.total_reviews); var t = Math.round(a); $("#rating_stars_widget .rating_icon").each((function(e, a) {
      if (e >= t)return!1; $(this).addClass("hover_on")}))}$("#tool_review_loader").hide(), $("#show_tool_rating").fadeIn(500)}function feedback_hover_add() {
  $("[data-active]").addClass("active"), $("[data-counter]").removeClass("hover_on"), $(".rating_icon[data-counter]").each((function() {
    var e = $(this).data("counter"); if ($('.rating_icon[data-counter="'+e+'"]').addClass("hover_on"), $(this).hasClass("active"))return $('.user_feedback[data-counter="'+e+'"]').addClass("hover_on"),
    !1
  }))}function showValidateionErrors(e) {
  return e = "<li>"+e+"</li>", $("#validation_errors").html(e), $("#validation_errors").removeClass("d-none"), $("#btn_sendFeedback").prop("disabled", !1), scrollModalUp(), resetReacaptcha(), !1
}function saveToolRating(e) {
  var a = new FormData($("#toolRating_form")[0]); $("#toolRating_form").hide(), $("#tool_rating_save_loader").show(), $.ajax({
    type: "post", data: a, contentType: !1, cache: !1, processData: !1, url: base_url+"save-rating/", success: function(e) {
      if ("success" == e.status) {
        $("#tool_rating_save_loader").fadeOut("slow"),
        $("#feedback_success").html(e.message),
        setTimeout((function() {
          $("#feedback_success").removeClass("d-none").fadeIn("slow")}), 300); var a = window.location.pathname; setCookie("ToolRating", "saved", 1440, a)} else if ("error" == e.status) {
        let a = "<ul>"; $.each(e.errors, (function(e, t) {
          a += "<li>"+t+"</li>"
        })),
        a += "</ul>",
        $("#validation_errors").removeClass("d-none"),
        $("#validation_errors").html(a),
        $("#btn_sendFeedback").html("Send Feedback"),
        $("#btn_sendFeedback").prop("disabled", !1),
        $("#toolRating_form").show(),
        resetReacaptcha(),
        scrollModalUp()}},
    error: function(e) {
      setTimeout((function() {
        $("#btn_sendFeedback").html("Send Feedback"), $("#btn_sendFeedback").prop("disabled", !1)}), 1e3)}})}function scrollModalUp() {
  $("#feedbackModal").animate({
    scrollTop: 0
  },
    "slow")}function resetReacaptcha() {
  $(".g-recaptcha").each((function(e, a) {
    grecaptcha.reset(e)}))}function clearFeedBackForm() {
  show_messages("success",
    "Thank You! Your feedback has been sent successfully."), $("#btn_sendFeedback").html('<img src="https://v1.smallseotools.com/webimages/success_msg.svg" alt="" class="img-fluid mx-2" style="width:20px"> Feedback Sent'), $("#feedback_success").delay(1e3).fadeOut("slow"), $("#feedback_form")[0].reset(), $("#feedbackModal").delay(1600).fadeOut("slow"), $("#feedbackModal").modal("hide"), $("#btn_sendFeedback").html("Send Feedback"), $("#btn_sendFeedback").prop("disabled",
    !1), $("#feedback_ss_name").text("Upload Screeshot"), resetReacaptcha()}function dataCallbackgRecapchaRating() {
  saveToolRating()}function validateBeforeSubmission() {
  var e; return $("#validation_errors").addClass("d-none"), "" == $("#feedback_message").val().trim() || 0 == (e = (e = $("#feedback_message").val().trim()).replace(/\s+/gi, " ").split(" ").length)?(showValidateionErrors("Please write message before you submit feedback."),
    !1): !(e > 300) || (showValidateionErrors("You can submit message of upto 300 Words maximum!"),
    !1)}function wordCounter() {
  setTimeout((function() {
    var e = $("#feedback_message").val().trim(); chars = e.length, chars?words = e.replace(/\s+/gi, " ").split(" ").length: words = 0, $("#count_words").html(words)}),
    500)}$(document).ready((function() {
      setTimeout((function() {
        $.ajax({
          type: "get", contentType: !1, cache: !1, processData: !1, url: base_url+"/get-tool-rating/"+$("#tool").val()+"/", success: function(e) {
            "success" == e.status && updateStarRating(e)}, error: function(e) {
            $("#tool_review_loader").hide()}})}), 1500)})), $("[data-counter]").hover((function() {
      $("[data-counter]").removeClass("active"); var e = $(this).data("counter"); $("[data-counter]").removeClass("hover_on"), $(".rating_icon[data-counter]").each((function() {
        var a = $(this).data("counter"); if ($('.rating_icon[data-counter="'+a+'"]').addClass("hover_on"), e == a)return $('.user_feedback[data-counter="'+a+'"]').addClass("hover_on"),
        !1
      }))}), (function() {
      feedback_hover_add()})), feedback_hover_add(), $("#feedback_screenShoot").on("change", (function(e) {
      return screen_shoot = $("#feedback_screenShoot")[0].files[0], screen_shoot_name = screen_shoot.name, $("#validation_errors").addClass("d-none"), screen_shoot.size > 10485760?(showValidateionErrors("Max Allowed File Size Is 10MB"), $("#feedback_ss_name").text("Upload Screeshot"), $("#feedback_screenShoot").val(""), !1): (f_extension = screen_shoot_name.substring(screen_shoot_name.lastIndexOf(".")+1), validExtensions = ["jpg", "png", "jpeg"], -1 == $.inArray(f_extension,
        validExtensions)?(showValidateionErrors("Only PNG And JPG Images are allowed!"),
        $("#feedback_ss_name").text("Upload Screeshot"),
        $("#feedback_screenShoot").val(""),
        !1): (screen_shoot_name.length > 25 && (screen_shoot_name = screen_shoot_name.substring(0, 25)+"."+f_extension),void $("#feedback_ss_name").text(screen_shoot_name)))})),$("#feedback_form").on("submit",(e=>{if(e.preventDefault(),validateBeforeSubmission()){$("#feedback_success").addClass("d-none");var a=new FormData($("#feedback_form")[0]);$("#btn_sendFeedback").html('<span style="height:1.5rem;width:1.5rem"  class="spinner-border text-white"></span>'),$("#btn_sendFeedback").prop("disabled",!0),$.ajax({type:"post",data:a,contentType:!1,cache:!1,processData:!1,url:base_url+"send-feedback/",success:function(e){if("success"==e.status)$("#feedback_success").html('<i class="bi bi-check-circle-fill text-success"></i> '+e.message),$("#feedback_success").removeClass("d-none"),$("#feedback_success").show(),clearFeedBackForm();else if("error"==e.status){let a="<ul>";$.each(e.errors,(function(e,t){a+="<li>"+t+"</li>"})),a+="</ul>",$("#validation_errors").removeClass("d-none"),$("#validation_errors").html(a),$("#btn_sendFeedback").html("Send Feedback"),$("#btn_sendFeedback").prop("disabled",!1),resetReacaptcha(),scrollModalUp()}},error:function(e){setTimeout((function(){$("#btn_sendFeedback").html("Send Feedback"),$("#btn_sendFeedback").prop("disabled",!1)}),1e3)}})}})),$("[data-counter]").click((function(){$("#feedback_emotion").val($(this).data("emotion")),console.log($(this).data("counter")),$("#star_rating").val($(this).data("counter")),$("#feedback_recaptcha_rating").trigger("click")})),$("#feedbackModal").on("shown.bs.modal",(function(e){$("#feeback-icon").hide()})),$("#feedbackModal").on("hidden.bs.modal",(function(e){$("#feeback-icon").show()}));