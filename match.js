var pos_cochonnet = Math.random()*(10-6)+6
pos_cochonnet = parseFloat(pos_cochonnet.toFixed(2))
var pos_cochonnet_px = pos_cochonnet*150;
var distance_j1_boule=""
var distance_j2_boule=""
var tableau_j1=[]
var tableau_j2=[]
var tableau_j1_trie =[]
var tableau_j2_trie =[]
var tableau_j1_a_trier =[]
var tableau_j2_a_trier =[]
var point_j1=0
var point_j2=0
var prochain_tour='non'
//variable permettant de terminer qui a la priorité pour jouer si il y a égalité si aleatoire<50 joueur 1 a l'avantage
var aleatoire=Math.random()*100

//Hauteur de départ= 0.5m origine placé sur balle
function traj()
    {
        /*En cas de victoire permet de ne plus pouvoir jouer a part en relancant la page*/
        if(window.point_j1>=13){return alert('Le joueur 1 est le grand vainqueur.Pour recommencer une partie, veuillez appuyer sur F5')}
        if(window.point_j2>=13){return alert('Le joueur 2 est le grand vainqueur.Pour recommencer une partie, veuillez appuyer sur F5')} 
        var aff_point_j1=document.getElementById('aff_point_j1')
        aff_point_j1.innerHTML= window.point_j1
        var aff_point_j2=document.getElementById('aff_point_j2')
        aff_point_j2.innerHTML= window.point_j2

        var y_b2=document.getElementById("boule_2").offsetTop
        var y_b3=document.getElementById("boule_3").offsetTop
        var y_b5=document.getElementById("boule_5").offsetTop
        var y_b6=document.getElementById("boule_6").offsetTop
        var boule_a_jouer=""
        
        //Pas de B1 ni de B4 car on n'en a pas besoin : si la boule 1 est jouée, la boule 4 est la prochaine a jouer
        //window. permet de prendre la variable global et non locale
        if(window.distance_j1_boule==""){boule_a_jouer="boule_1"}    // Si la boule 1 n'a pas encore joué par le joueur 1, c'est à lui
        else if(window.distance_j2_boule==undefined){boule_a_jouer="boule_4"} // Alors, si la boule 4 (première des boules du joueur 2) n'a pas joué par le joueur 2, c'est à lui

            /*Explication : J1 lance B1 à 1,0 m du cochonnet. J2 lance B4 à 0.04 m du cochonnet. C'est à J1 de jouer B2. Il lance B2 à 0.50m. C'est donc toujours à lui. */
        else if(window.distance_j1_boule>window.distance_j2_boule) // Si la boule 1 et la boule 4 ont été jouées mais que la boule 4 est la plus proche du cochonnet, 
            {
                if(y_b2<140){boule_a_jouer="boule_2"}//Alors, si la boule 2 n'a pas été jouée(sa coordonnée en y (son top) correspond à l'origine ,c'est au tour du joueur 1 de jouer la boule 2
                else if(y_b3<140) {boule_a_jouer="boule_3"}//Pareil avec la boule 3
                else if(y_b5<140) {boule_a_jouer="boule_5"}//j1 ayant joué toute ses boules c'est au tour de j2 la boule puis la boule 6
                else if(y_b6<140) {
                    boule_a_jouer="boule_6"
                    window.prochain_tour="oui"
                    }
                else return alert("Vous n'avez plus de boule à jouer,Veuillez cliquer sur prochain tour")
                
            }
        //C'est le meme cas si j1 est plus près   
        else if(window.distance_j2_boule>window.distance_j1_boule)
            {
                if(y_b5<140){boule_a_jouer="boule_5"}
                else if(y_b6<140) {boule_a_jouer="boule_6"} 
                else if(y_b2<140) {boule_a_jouer="boule_2"}//j2 ayant joué toute ses boules c'est au tour de j1
                else if(y_b3<140) {
                    boule_a_jouer="boule_3"
                    window.prochain_tour="oui"
                    }
                else return alert("Vous n'avez plus de boule à jouer,Veuillez cliquer sur prochain tour")
            }
        else if (window.distance_j2_boule==window.distance_j1_boule)
            {/* Si les deux joueurs lancent exactement au meme endroit une fonction aléatoire pour déterminer a qui s'est de jouer*/
            
            if (window.aleatoire<50){
                if(y_b2<140){boule_a_jouer="boule_2"}
                else if(y_b3<140) {boule_a_jouer="boule_3"}
                else if(y_b5<140) {boule_a_jouer="boule_5"}
                else if(y_b6<140) {
                    boule_a_jouer="boule_6"
                    window.prochain_tour="oui"
                    }
                else return alert("Vous n'avez plus de boule à jouer,Veuillez cliquer sur prochain tour")
            }
            else {if(y_b5<140){boule_a_jouer="boule_5"}
                else if(y_b6<140) {boule_a_jouer="boule_6"}
                else if(y_b2<140) {boule_a_jouer="boule_2"}
                else if(y_b3<140) {
                    boule_a_jouer="boule_3"
                    window.prochain_tour="oui"
                    }
                    else return alert("Vous n'avez plus de boule à jouer,Veuillez cliquer sur prochain tour")    
                
            }
            }
        else {window.prochain_tour="oui"
            return alert("Vous n'avez plus de boule à jouer,Veuillez cliquer sur prochain tour")}      
        
            //Calcul de la trajectoire
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
        pos_boulex= pos_boulex.concat(portée.toFixed(2))
        pos_bouley= pos_bouley.concat(-0.5)
        
        //ralongement de la rajectoire pour que la boule roule
        var prolongement_x= (cosa*v0)/2   //2 de façon subjective permettant de faire rouler la boule au sol
        //la vitesse d'affichement du ralongement de la trajectoire dépend de l'angle initiale (manière subjective et non parfaite)
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
            var iter=0.5
            pos_boulex=pos_boulex.concat((portée+0.3*iter).toFixed(2))
            pos_bouley=pos_bouley.concat('-0.5')
            iter=iter +0.3
        }
        var pos_boulex_px = m_en_px(pos_boulex) //conversion m en pixels
        var pos_bouley_px = m_en_px(pos_bouley)
        //traçage de la courbe 
        for(let i=0; i<pos_boulex_px.length; i++) {
            var mouvement_x = parseFloat(pos_boulex_px[i]) + parseFloat("198");
            var mouvement_y = parseFloat("562") - parseFloat(pos_bouley_px[i])
            if(boule_a_jouer=="boule_1"){$("#boule_1").animate({ left: mouvement_x, top: mouvement_y}, 80, "linear")}
            if(boule_a_jouer=="boule_2"){$("#boule_2").animate({ left: mouvement_x, top: mouvement_y}, 80, "linear")}
            if(boule_a_jouer=="boule_3"){$("#boule_3").animate({ left: mouvement_x, top: mouvement_y}, 80, "linear")}
            if(boule_a_jouer=="boule_4"){$("#boule_4").animate({ left: mouvement_x, top: mouvement_y}, 80, "linear")}
            if(boule_a_jouer=="boule_5"){$("#boule_5").animate({ left: mouvement_x, top: mouvement_y}, 80, "linear")}
            if(boule_a_jouer=="boule_6"){$("#boule_6").animate({ left: mouvement_x, top: mouvement_y}, 80, "linear")}
        }


        var longueur_liste= pos_boulex_px.length
        var portee_px = pos_boulex_px[longueur_liste-1]
        var distance_coch_boule=""
        distance_coch_boule = Math.abs((pos_cochonnet_px-portee_px)/150) // Une distance ne peut être négative, d'où l'utilisation d'une valeur absolue. Convertion pixel (px) en mètre
        distance_coch_boule= distance_coch_boule.toFixed(2)
        
        
        /* Ci-dessous, système qui permet de faire 2 tableaux, triés de la plus petite distance au cochonnet à la plus grande, afin de savoir à qui le tour de jouer au prochain tour */
       
        if(boule_a_jouer=="boule_1"||boule_a_jouer=="boule_2"||boule_a_jouer=="boule_3"){
            tableau_j1=tableau_j1_a_trier.push(parseFloat(distance_coch_boule))
            }
        else {tableau_j2=tableau_j2_a_trier.push(parseFloat(distance_coch_boule))}
        //tri des tableaux de chaque joueur pour calcul des distances
        window.tableau_j1_trie =tri(window.tableau_j1_a_trier)
        window.tableau_j2_trie =tri(window.tableau_j2_a_trier)
        window.distance_j1_boule= window.tableau_j1_trie[0]
        window.distance_j2_boule= window.tableau_j2_trie[0]
       //fonction permettant de dire au joueur a qui est le tour mais problème lors de la boule 3 et 6 car la boule n'est pas déplacé lors du tir donc on la compte pas joué
        var prochain_coup =document.getElementById('prochain_coup')
        prochain_coup.innerHTML=""
        //j1 joue le premier coup donc c'est ensuite à j2
        if(boule_a_jouer=="boule_1"){prochain_coup.innerHTML="C'est au joueur 2 de jouer"} 
        //Si j1 est plus près et que j2 a encore des boules a jouer c'est au tour de j2 sinon c'est au tour de j1
        if(window.distance_j2_boule>window.distance_j1_boule) 
            {
                if(y_b6<140||y_b5<140){prochain_coup.innerHTML="C'est au joueur 2 de jouer"}
                else if(y_b3<140||y_b2<140){prochain_coup.innerHTML="C'est au joueur 1 de jouer"}
                else return prochain_coup.innerHTML="Veuillez cliquer sur prochain tour"         
            }
        else if(window.distance_j1_boule>window.distance_j2_boule)
            {//inversement si j2 est plus près 
                if(y_b2<140||y_b3<140){prochain_coup.innerHTML="C'est au joueur 1 de jouer"}
            else if(y_b5<140||y_b6<140){prochain_coup.innerHTML="C'est au joueur 2 de jouer"}
            else return prochain_coup.innerHTML="Veuillez cliquer sur prochain tour"
            }
        
        else if (window.distance_j2_boule==window.distance_j1_boule)
            {/* Si les deux joueurs lancent exactement au meme endroit une fonction aléatoire pour déterminer a qui s'est de jouer*/
            if (window.aleatoire<50){
                if(y_b2<140||y_b3<140){prochain_coup.innerHTML="C'est au joueur 2 de jouer"}
                else if(y_b5<140||y_b6<140){prochain_coup.innerHTML="C'est au joueur 1 de jouer"}
                else return prochain_coup.innerHTML="Veuillez cliquer sur prochain tour"
                }
            else {
                if(y_b2<140||y_b3<140){prochain_coup.innerHTML="C'est au joueur 2 de jouer"}
                else if(y_b5<140||y_b6<140){prochain_coup.innerHTML="C'est au joueur 1 de jouer"}
                else return prochain_coup.innerHTML="Veuillez cliquer sur prochain tour"    
            }
        }        

    }
function m_en_px(tableau_m){
    var tableau_px = []
    for (let i = 0; i < tableau_m.length; i++) {
        temp = tableau_m[i] * 150;
        tableau_px[i] = temp.toFixed(2); //notre echelle à nous 1m pour 150 px
    }
return tableau_px;    
}

function draw() {
    //aANimation du cochonnet au lancement de la page 
    $("#cochonnet").animate({left:window.pos_cochonnet_px+parseFloat('212')},1, "linear")
} 

function tri(tableau_a_trier){
    tableau_a_trier.sort()
    return tableau_a_trier
}
function proch_tour(){
    /*J1 ou J2 a atteint 13 points il a donc gagné*/
    if(window.point_j1>=13){return alert('Le joueur 1 est le grand vainqueur.Pour recommencer une partie, veuillez appuyer sur F5')}
    if(window.point_j2>=13){return alert('Le joueur 2 est le grand vainqueur.Pour recommencer une partie, veuillez appuyer sur F5')} 
       
    if(window.prochain_tour=='oui')
            {/*Calcul des distances et ajout point si j1 vainqueur*/
            if(window.distance_j1_boule<window.distance_j2_boule)
                {
                    if(window.tableau_j1_trie[1]<window.distance_j2_boule)
                        {
                        if(window.tableau_j1_trie[2]<window.distance_j2_boule)
                            {
                            window.point_j1= window.point_j1+1
                            }
                        window.point_j1= window.point_j1+1
                        }
                window.point_j1= window.point_j1+1
                }
            /*Calcul point si j2 vainqueur*/    
            if(window.distance_j2_boule<window.distance_j1_boule)
                {
                    if(window.tableau_j2_trie[1]<window.distance_j1_boule)
                        {
                        if(window.tableau_j2_trie[2]<window.distance_j1_boule)
                            {
                            window.point_j2= window.point_j2+1
                            }
                        window.point_j2= window.point_j2+1
                        }
                window.point_j2= window.point_j2+1
                }
            var aff_point_j1=document.getElementById('aff_point_j1')
            aff_point_j1.innerHTML= window.point_j1
            var aff_point_j2=document.getElementById('aff_point_j2')
            aff_point_j2.innerHTML= window.point_j2
            if(window.point_j1>=13){return alert('Le joueur 1 est le grand vainqueur.Pour recommencer une partie, veuillez appuyer sur F5')}
            if(window.point_j2>=13){return alert('Le joueur 2 est le grand vainqueur.Pour recommencer une partie, veuillez appuyer sur F5')}                   
           
            //réinitialisation des variables globales pour le prochain tour 
            prochain_coup.innerHTML=""
            window.pos_cochonnet = Math.random()*(10-6)+6
            window.pos_cochonnet = parseFloat(window.pos_cochonnet.toFixed(2))
            window.pos_cochonnet_px = window.pos_cochonnet*150;
            window.distance_j1_boule=""
            window.distance_j2_boule=""
            window.tableau_j1=[]
            window.tableau_j2=[]
            window.tableau_j1_trie =[]
            window.tableau_j2_trie =[]
            window.tableau_j1_a_trier =[]
            window.tableau_j2_a_trier =[]
            window.aleatoire=Math.random()*100
            $("#boule_1").animate({ left: 990, top: 132}, 1, "linear")
            $("#boule_2").animate({ left: 1024, top: 132}, 1, "linear")
            $("#boule_3").animate({ left: 1058, top: 132}, 1, "linear")
            $("#boule_4").animate({ left: 1236, top: 132}, 1, "linear")
            $("#boule_5").animate({ left: 1270, top: 132}, 1, "linear")
            $("#boule_6").animate({ left: 1305, top: 132}, 1, "linear")
            $("#cochonnet").animate({left:window.pos_cochonnet_px+parseFloat('212')},1, "linear")
            window.prochain_tour='non'
            }
        
            else return alert("vous n'avez pas terminé la partie veuiller jouez")
}


/*Les trois fonctions ci-après servent à faire fonctionner un chronomètre qui indique le temps écoule depuis le chargement de la page, le début de la partie en somme
Le travail de conception n'a pas été réalisé par nos soins à 100% : il provient d'ici https://stackoverflow.com/a/31406310 */

function markPresent() {
    window.markDate = new Date();
    $(document).ready(function() {
        $("div.absent").toggleClass("present");
    });
    updateClock();
    console.log("coucou ca va bien jusqu'ici")
}

function updateClock() {  
    var currDate = new Date();
    var diff = currDate - markDate;
    document.getElementById("chrono").innerHTML = format(diff/1000);
    setTimeout(function() {updateClock()}, 1000);
}

function format(seconds)
{
var numhours = parseInt(Math.floor(((seconds % 31536000) % 86400) / 3600),10);
var numminutes = parseInt(Math.floor((((seconds % 31536000) % 86400) % 3600) / 60),10);
var numseconds = parseInt((((seconds % 31536000) % 86400) % 3600) % 60,10);
    return ((numhours<10) ? "0" + numhours : numhours)
    + ":" + ((numminutes<10) ? "0" + numminutes : numminutes)
    + ":" + ((numseconds<10) ? "0" + numseconds : numseconds);
}
