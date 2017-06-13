<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


/**
 * App\Comment
 *
 * @property integer $id
 * @property integer $admin_id
 * @property string $heading
 * @property string $text
 * @property boolean $star
 * @property integer $id_clients
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property-read \App\Client $client
 * @method static \Illuminate\Database\Query\Builder|\App\Comment whereId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Comment whereAdminId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Comment whereHeading($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Comment whereText($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Comment whereStar($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Comment whereIdClients($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Comment whereCreatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Comment whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Comment extends Model
{
	protected $table = 'comments';

	protected $fillable = ['heading', 'text', 'star', 'id_clients', 'admin_id'];
	public $isEdit = false;

	/**
	 * Relation comment to his owner
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 */
	public function client()
	{
		return $this->hasOne(\App\Client::class, 'id', 'id_clients');
	}
}
