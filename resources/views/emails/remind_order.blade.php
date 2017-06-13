<!-- <div style="background: #f3f3f3; width: 100%;">
<div style="margin: 0 auto; width: 701px;">
<div style="width: 699px; background: #ffffff; border: 1px solid #e9e9e9;">
  <img src="http://tb.hqsale.com/wp/wp-content/themes/bootstrap-basic/img/logo.jpg" alt="timebox24" style="margin: 0 10px 0 30px;">
</div>

<div style="width: 629px; background: #ffffff; border: 1px solid #e9e9e9; border-top: 0px solid; padding: 15px 35px;">
  <h2>@lang('emails.remind', [], $locale)</h2>

  <div style="margin-bottom: 30px;">
      <p style="margin: 0px;">@lang('emails.hello', [], $locale), <strong>{{$first_name}} !</strong></p>
      <p style="margin: 0px;">@lang('emails.message_remind_order', [], $locale)</p>
  </div>

  <img src="{{ $message->embed($path) }}" style="max-height: 110px; max-width: 93px;">

  <div style="display: inline-block; vertical-align: top; padding: 5px 0 0 16px;">
    <p style="margin: 0 0 4px 0;"><strong>@lang('common.date', [], $locale):</strong> {{$date}}</p>
    <p style="margin: 0 0 4px 0;"><strong>@lang('emails.start_time', [], $locale):</strong> {{$time_from}}</p>
    <p style="margin: 0 0 4px 0;"><strong>@lang('emails.where', [], $locale):</strong> {{$street}} {{$post_index}}</p>
    <p style="margin: 0 0 4px 0;"><strong>@lang('emails.employee', [], $locale):</strong>  {{$service_name}}. @lang('emails.price', [], $locale) = {{$price}} €</p>
  </div>

  <div style="margin-bottom: 30px; margin-top: 90px;">
    <p style="margin: 0px;">@lang('emails.best_regards', [], $locale)</p>
    <p style="margin: 0px;">@lang('emails.your_timebox', [], $locale)</p>
  </div>
</div>

<div style="width: 629px; background: #ffffff; border: 1px solid #e9e9e9; border-top: 0px solid; padding: 20px 35px; color: #bcbcbc; font-size: 13px;">
  <p>@lang('emails.please_not_answer', [], $locale)</p>
  <p>@lang('emails.copy_right', [], $locale)</p>
  <img src="http://icons.iconarchive.com/icons/emey87/social-button/32/facebook-icon.png" style="margin-right: 10px; margin-top: 15px; width: 32px; height: 32px;">
  <img src="http://icons.iconarchive.com/icons/emey87/social-button/32/twitter-icon.png" style="margin-right: 10px; margin-top: 15px; width: 32px; height: 32px;">
  <img src="http://icons.iconarchive.com/icons/martz90/circle/32/google-plus-icon.png" style="margin-top: 15px; width: 32px; height: 32px;">
</div>
</div>
</div> -->
<div style="background: #f3f3f3; width: 100%;">
<div style="margin: 0 auto; width: 701px;">
<div style="width: 699px; background: #ffffff; border: 1px solid #e9e9e9;">
  <img src="http://tb.hqsale.com/wp/wp-content/themes/bootstrap-basic/img/logo.jpg" alt="timebox24" style="margin: 0 10px 0 30px;">
</div>

<div style="width: 629px; background: #ffffff; border: 1px solid #e9e9e9; border-top: 0px solid; padding: 15px 35px;">
  @if($status == 'create')
    <h2>@lang('emails.approve', [], $locale)</h2>
  @elseif($status == 'edit')
    <h2>@lang('emails.edit_order', [], $locale)</h2>
  @else
    <h2>@lang('emails.delete_order', [], $locale)</h2>
  @endif

  <div style="margin-bottom: 30px;">
      <p style="margin: 0px;">@lang('emails.hello', [], $locale), <strong>{{$first_name}} !</strong></p>
      @if($status == 'create')
        <p style="margin: 0px;">@lang('emails.message_approve_create_order', [], $locale)</p>
      @elseif($status == 'edit')
        <p style="margin: 0px;">@lang('emails.message_approve_edit_order', [], $locale)</p>
      @else
        <p style="margin: 0px;">@lang('emails.message_approve_delete_order', [], $locale)</p>
      @endif
  </div>
  <div style="height: 110px; width: 110px; overflow: hidden; float: left;"> 
    <img src="{{ $message->embed($path) }}" style="max-width: 110px;">
  </div>
  <div style="display: inline-block; vertical-align: top; padding: 0px 0 0 16px; width: 75%;">
    <p style="margin: 0 0 4px 0;"><strong>@lang('common.date', [], $locale):</strong> {{$date}}</p>
    <p style="margin: 0 0 4px 0;"><strong>@lang('emails.start_time', [], $locale):</strong> {{$time_from}}</p>
    <p style="margin: 0 0 4px 0;"><strong>@lang('emails.where', [], $locale):</strong> {{$street}} {{$post_index}}</p>
    <p style="margin: 0 0 4px 0;"><strong>@lang('common.employees', [], $locale):</strong>  {{$name}}.</p>
    <p style="margin: 0 0 4px 0;"><strong>@lang('emails.service_name', [], $locale):</strong>  {{$service_name}}</p>
    <p style="margin: 0 0 4px 0;"><strong>@lang('emails.price', [], $locale):</strong> {{$price}} €</p>
  </div>

  <div style="margin-bottom: 30px; margin-top: 90px;">
    <p style="margin: 0px;">@lang('emails.best_regards', [], $locale)</p>
    <p style="margin: 0px;">@lang('emails.your_timebox', [], $locale)</p>
  </div>
</div>

<div style="width: 629px; background: #ffffff; border: 1px solid #e9e9e9; border-top: 0px solid; padding: 20px 35px; color: #bcbcbc; font-size: 13px;">
  <p>@lang('emails.please_not_answer', [], $locale)</p>
  <p>@lang('emails.copy_right', [], $locale)</p>
  <img src="http://icons.iconarchive.com/icons/emey87/social-button/32/facebook-icon.png" style="margin-right: 10px; margin-top: 15px; width: 32px; height: 32px;">
  <img src="http://icons.iconarchive.com/icons/emey87/social-button/32/twitter-icon.png" style="margin-right: 10px; margin-top: 15px; width: 32px; height: 32px;">
  <img src="http://icons.iconarchive.com/icons/martz90/circle/32/google-plus-icon.png" style="margin-top: 15px; width: 32px; height: 32px;">
</div>
</div>
</div>