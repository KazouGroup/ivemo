<?php

namespace App\Http\Resources;

use App\Models\comment;
use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'statusOnline' => $this->isOnline(),
            'likeked' => $this->likeked(),
            'likeked_count' => $this->likes()
                ->whereIn('likeable_id',[$this->id])
                ->where('likeable_type', comment::class)
                ->count(),
            'user' => $this->user,
            'commentable' => $this->commentable,
            'commentable_type' => $this->commentable_type,
            'responsecomments' => $this->responsecomments,
            'status' => $this->status,
            'user_id' => $this->user_id,
            'body' => $this->body,
            'ip' => $this->ip,
            'created_at' => (string) $this->created_at,
            'updated_at' => (string) $this->updated_at,
        ];
    }
}
