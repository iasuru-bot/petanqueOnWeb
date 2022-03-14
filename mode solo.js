var pos_cochonnet = Math.random()*(10-6)+6
var pos_cochonnet = parseFloat(pos_cochonnet.toFixed(2))
var pos_cochonnet_px = pos_cochonnet*150;
//Hauteur de départ= 0.5m origine placé sur balle
function traj()
    {
        //calcul de la trajectoire
        var v0_pourcent=document.getElementById('vitesse_initiale').value;
        var v0 = v0_pourcent*12/100;
        var angle = document.getElementById('angle_initial').value;
        var cosa= Math.cos(angle*Math.PI/180) ;
        var sina= Math.sin(angle*Math.PI/180);
        var t=0;
        var g= 9.80665;
        var y_de_t=-(g*Math.pow(t,2))/2+(v0*sina)*t;
        var x_de_t=(v0*cosa)*t;
        var pos_boulex=[];
        var pos_bouley=[];
        var pos_boulex_px=[];
        var pos_bouley_px=[];
        while (y_de_t>-0.5)
        {
            var y_de_t=-(g*Math.pow(t,2))/2+(v0*sina)*t
            var x_de_t=(v0*cosa)*t
            pos_boulex=pos_boulex.concat(x_de_t.toFixed(2))
            pos_bouley=pos_bouley.concat(y_de_t.toFixed(2))
            t=t+0.05
        }
        var surplus_x= pos_boulex.pop()
        var surplus_y= pos_bouley.pop()
        var portée=(v0*cosa)*(v0*sina+Math.sqrt(Math.pow(v0*sina,2)+2*g*0.5))/g
        var pos_boulex= pos_boulex.concat(portée.toFixed(2))
        var pos_bouley= pos_bouley.concat(-0.5)
        
        //ralongement de la rajectoire pour que la boule roule
        var prolongement_x= (cosa*v0)/2   //2 de façon random 
        //la vitesse d'affichement du ralongement de la trajectoire dépend de l'angle initiale (manière subjective et non parfaite)
        var iter=0.5
        if(angle>=65)
        {
            var iter=0
            while (iter<=prolongement_x)
            {
                pos_boulex=pos_boulex.concat((portée+0.1*iter).toFixed(2))
                pos_bouley=pos_bouley.concat('-0.5')
                iter=iter +0.1
            }
        }
        else if(angle<=25)
        {
            var iter=1
            while (iter<=prolongement_x)
            {
                pos_boulex=pos_boulex.concat((portée+0.5*iter).toFixed(2))
                pos_bouley=pos_bouley.concat('-0.5')
                iter=iter +0.5
            }
        }
        else while (iter<=prolongement_x)
        {
            pos_boulex=pos_boulex.concat((portée+0.3*iter).toFixed(2))
            pos_bouley=pos_bouley.concat('-0.5')
            iter=iter +0.3
        }
        var pos_boulex_px = m_en_px(pos_boulex) //conversion m en pixels
        var pos_bouley_px = m_en_px(pos_bouley)
        //traçage de la courbe
        deplacer_boule(pos_boulex_px, pos_bouley_px)

        //calcul des disatnces basé sur la derniere valeur de la boule
        var longueur_liste= pos_boulex_px.length
        var portee_px = pos_boulex_px[longueur_liste-1]
        var distance_coch_boule = (pos_cochonnet_px-portee_px)/150
        var distance_coch_boule= distance_coch_boule.toFixed(2)
        if(distance_coch_boule<0){distance_coch_boule=distance_coch_boule*-1}
       
        aff_dist_coch_boule.innerHTML = distance_coch_boule   
        var distance_perso_boule = portee_px/150
        aff_dist_perso_boule.innerHTML =distance_perso_boule
       

    }

function deplacer_boule(pos_boulex_px, pos_bouley_px){

    
    for(let i=0; i<pos_boulex_px.length; i++) {
            var mouvement_x = parseFloat(pos_boulex_px[i]) + parseFloat("198");
            var mouvement_y = parseFloat("562") - parseFloat(pos_bouley_px[i])
            $("#boule_1").animate({ left: mouvement_x, top: mouvement_y}, 80, "linear")
    }
    

}

function m_en_px(tableau_m){
    var tableau_px = []
    for (let i = 0; i < tableau_m.length; i++) {
        temp = tableau_m[i] * 150;
        tableau_px[i] = temp.toFixed(2); // 1m=150px 
    }
return tableau_px;    
}

function draw() {
    
    $("#cochonnet").animate({left:pos_cochonnet_px+parseFloat('212')},1, "linear")
    } 