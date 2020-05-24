<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\Contactuser\StorecontactRequest;
use App\Model\annoncetype;
use App\Model\annoncevente;
use App\Model\categoryannoncevente;
use App\Model\city;
use App\Model\contactusersvente;
use App\Model\user;
use App\Services\Contactusers\ContactusersventeService;
use Symfony\Component\HttpFoundation\Response;


class ContactusersventeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth',['except' => [
            'sendcontactmessageuser',
        ]]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function personalmessagesannonces_ventes(user $user)
    {
        if (auth()->user()->id === $user->id){
            return view('user.profile.contactuservente.personal_mailannonces_ventes',[
                'user' => auth()->user()
            ]);
        }else{
            abort(404);
        }

    }

    public function personalmessagesannonces_ventes_by_mail(user $user)
    {
        if (auth()->user()->id === $user->id){
            return view('user.profile.contactuservente.personal_mailannonces_ventes',[
                'user' => auth()->user()
            ]);
        }else{
            abort(404);
        }

    }

    public function personalmessagesarchvement_annonces_ventes(user $user)
    {
        if (auth()->user()->id === $user->id){
            return view('user.profile.contactuservente.personal_mailannonces_ventes',[
                'user' => auth()->user()
            ]);
        }else{
            abort(404);
        }

    }

    public function personalmessagesfavannonces_ventes(user $user)
    {
        if (auth()->user()->id === $user->id){
            return view('user.profile.contactuservente.personal_mailannonces_ventes',[
                'user' => auth()->user()
            ]);
        }else{
            abort(404);
        }

    }

    public function apipersonalmailsannoncesventes(user $user)
    {
        if (auth()->user()->id === $user->id){

            $contactusersventes = ContactusersventeService::apipersonalmessagesannonces($user);

            return response()->json($contactusersventes, 200);
        }else{
            abort(404);
        }

    }

    public function apipersonalmailsarchvementannoncesventes(user $user)
    {
        if (auth()->user()->id === $user->id){

            $contactusersventes = ContactusersventeService::apipersonalmailsarchvementannoncesventes($user);

            return response()->json($contactusersventes, 200);
        }else{
            abort(404);
        }

    }

    public function apipersonalmailsfavoriteannoncesventes(user $user)
    {
        if (auth()->user()->id === $user->id){

            $contactusersventes = ContactusersventeService::apipersonalmailsfavoriteannoncesventes($user);

            return response()->json($contactusersventes, 200);
        }else{
            abort(404);
        }

    }

    public function apipersonalmailsannoncesventesbyannonce(user $user)
    {
        if (auth()->user()->id === $user->id){

            $contactusersventes = ContactusersventeService::apipersonalmailsannoncesventesbyannonce($user);

            return response()->json($contactusersventes, 200);
        }else{
            abort(404);
        }

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\Response
     */
    public function sendcontactmessageuser(StorecontactRequest $request, annoncetype $annoncetype,categoryannoncevente $categoryannoncevente,city $city,annoncevente $annoncevente)
    {

        $contactusersvente = new contactusersvente();


        $contactusersvente->fill($request->all());
        $contactusersvente->slug = sha1(('YmdHis') . str_random(30));
        $contactusersvente->user_id = $annoncevente->user->id;
        $contactusersvente->annoncevente_id = $annoncevente->id;

        ContactusersventeService::newEmailToannoncelocationpageShow($request,$annoncevente);

        $contactusersvente->save();

        return response()->json($contactusersvente,200);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\Response
     */
    public function apipersonalmessagesannonces_show(user $user,contactusersvente $contactusersvente)
    {
        $this->authorize('update',$contactusersvente);

        $contactusersventes = ContactusersventeService::apipersonalmessagesannonces_show($user,$contactusersvente);

        return response()->json($contactusersventes, 200);
    }

    public function personalmessagesannonces_ventes_show($user,contactusersvente $contactusersvente)
    {
        $this->authorize('update',$contactusersvente);

        return view('user.profile.contactuservente.personal_mailannonces_ventes_show',[
            'user' => auth()->user(),
            'contactusersvente' => $contactusersvente
        ]);
    }


    public function personalmessagescontactsactive($id)
    {
        $contactusersvente = contactusersvente::where('id', $id)->findOrFail($id);

        $this->authorize('update',$contactusersvente);

        if(auth()->user()->id === $contactusersvente->user_id){
            $contactusersvente->update(['status_red' => 1,]);
            return response('success response',Response::HTTP_ACCEPTED);
        }
    }

    public function personalmessagescontactsunactive($id)
    {
        $contactusersvente = contactusersvente::where('id', $id)->findOrFail($id);

        $this->authorize('update',$contactusersvente);

        if(auth()->user()->id === $contactusersvente->user_id){
            $contactusersvente->update(['status_red' => 0,]);
            return response('success response',Response::HTTP_ACCEPTED);
        }
    }

    public function personalmessagescontactsfavorite($id)
    {
        $contactusersvente = contactusersvente::where('id', $id)->findOrFail($id);

        $this->authorize('update',$contactusersvente);

        if(auth()->user()->id === $contactusersvente->user_id){
            $contactusersvente->update([ 'status_favorite' => 1,]);
            return response('success response',Response::HTTP_ACCEPTED);
        }
    }

    public function personalmessagescontactsunfavorite($id)
    {
        $contactusersvente = contactusersvente::where('id', $id)->findOrFail($id);

        $this->authorize('update',$contactusersvente);

        if(auth()->user()->id === $contactusersvente->user_id){
            $contactusersvente->update([ 'status_favorite' => 0,]);
            return response('success response',Response::HTTP_ACCEPTED);
        }
    }

    public function personalmessagescontactsunarchvement($id)
    {
        $contactusersvente = contactusersvente::where('id', $id)->findOrFail($id);

        $this->authorize('update',$contactusersvente);

        if(auth()->user()->id === $contactusersvente->user_id){
            $contactusersvente->update([ 'status_archvement' => 0,]);
            return response('success response',Response::HTTP_ACCEPTED);
        }
    }

    public function personalmessagescontactsarchvement($id)
    {
        $contactusersvente = contactusersvente::where('id', $id)->findOrFail($id);

        $this->authorize('update',$contactusersvente);

        if(auth()->user()->id === $contactusersvente->user_id){
            $contactusersvente->update([ 'status_archvement' => 1,]);
            return response('success response',Response::HTTP_ACCEPTED);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return array|\Illuminate\Http\Response
     */
    public function personalmessagesdelete(contactusersvente $contactusersvente,$id)
    {
        $contactusersvente = contactusersvente::findOrFail($id);
        $this->authorize('update',$contactusersvente);
        if (auth()->user()->id === $contactusersvente->user_id){
            $contactusersvente->delete();
            return ['message' => 'message deleted '];
        }else{
            abort(404);
        }

    }
}
