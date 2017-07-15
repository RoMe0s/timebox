<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


/**
 * App\Order
 *
 * @property integer $id
 * @property integer $admin_id
 * @property float $price
 * @property float $tax
 * @property integer $employee_count
 * @property float $extra_price
 * @property string $status
 * @property string $name
 * @property string $paid_at
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property-read \App\Admin $admin
 * @property-read \App\OrderSMS $orderSMS
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\OrderEmployee[] $orderEmployees
 * @method static \Illuminate\Database\Query\Builder|\App\Order whereId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Order whereAdminId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Order wherePrice($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Order whereTax($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Order whereEmployeeCount($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Order whereExtraPrice($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Order whereStatus($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Order whereName($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Order wherePaidAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Order whereCreatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Order whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Order activeOrCancel()
 * @method static \Illuminate\Database\Query\Builder|\App\Order new()
 * @method static \Illuminate\Database\Query\Builder|\App\Order old()
 * @mixin \Eloquent
 */
class Order extends Model
{
    protected $table = 'orders';
    protected $fillable = ['admin_id', 'price', 'discount', 'count', 'sms_count', 'tax', 'employee_count', 'extra_price', 'for_what', 'status', 'name', 'paid_at'];

	/**
	 * Get created order date in right format
	 *
	 * @param $value
	 *
	 * @return string
	 */
    public function getCreatedAtAttribute($value)
    {
        return (new \DateTime($value))->format('d-m-Y');
    }

	/**
	 * Scope for new and canceled orders for admin
	 *
	 * @param $query
	 *
	 * @return mixed
	 */
	public function scopeActiveOrCancel($query)
	{
		return $query->where('status', 'new')
				->orWhere('status', 'cancel');
    }

	/**
	 * Get only new orders
	 *
	 * @param $query
	 */
	public function scopeNew($query)
	{
		$query->where('status', '!=', 'paid')->orderBy('created_at', 'desc');
    }

	/**
	 * Get only old orders
	 *
	 * @param $query
	 */
	public function scopeOld($query)
	{
		$query->where('status', 'paid')->orderBy('created_at', 'desc');
	}

	/**
	 * Relation order to his admin owner
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 */
	public function admin()
	{
		return $this->belongsTo(\App\Admin::class, 'admin_id', 'id');
    }

	/**
	 * Relation one order can be has one order sms
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\HasOne
	 */
	public function orderSMS()
	{
		return $this->hasOne(\App\OrderSMS::class, 'order_id', 'id');
    }

	/**
	 * Relation one order has many order employees
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\HasMany
	 */
	public function orderEmployees()
	{
		return $this->hasMany(\App\OrderEmployee::class, 'order_id', 'id');
    }

    public static function getOrdersForDirector($page)
    {
        return self::join('admins', 'admins.id', '=', 'orders.admin_id')
            ->select(['orders.id', 'orders.price', 'orders.discount', 'orders.count', 'orders.sms_count', 'orders.for_what', 'orders.status', 'orders.created_at', 'orders.paid_at',
                'admins.firstname', 'admins.lastname', 'admins.firmlink'])
            ->orderBy('created_at', 'desc')->skip(15 * ($page - 1))->take(15)->get();
    }
}
