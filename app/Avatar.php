<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


/**
 * App\Avatar
 *
 * @property integer $id
 * @property integer $user_id
 * @property string $path
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @method static \Illuminate\Database\Query\Builder|\App\Avatar whereId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Avatar whereUserId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Avatar wherePath($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Avatar whereCreatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Avatar whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Avatar extends Model
{
	protected $table = 'avatars';
	protected $fillable = ['user_id', 'path'];

	public static function storeAvatar($userId, $request)
	{

		if ($request->hasFile('avatar')) {
			$avatar = $request->file('avatar');

			$path = '/avatars/images/';
			$fileName = str_random(8) . $avatar->getClientOriginalName();
			$fullPath = public_path() . $path;

			if (self::where('user_id', $userId)->first()) {
				$oldAvatar = self::where('user_id', $userId)->first()->path;
				unlink(public_path() . $oldAvatar);

				$avatar->move($fullPath, $fileName);
				self::where('user_id', $userId)->update(['path' => $path . $fileName]);
			} else {
				self::where('user_id', $userId)->insert([
					'user_id' => $userId, 'path' => $path . $fileName,
				]);
				$avatar->move($fullPath, $fileName);
			}

			return $path . $fileName;
		}
		return false;
	}
}
