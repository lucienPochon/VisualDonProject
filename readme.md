# Projet VisualDon - Acces to anti retroviral drug


#### Où vous avez trouvé les données ?

The World Bank - Gender statistics 
et plus particulièrement ce [jeu de données](https://datacatalog.worldbank.org/dataset/gender-statistics)

#### Comment vous les avez transformées ? 

En choissant un nombre réduits de données et en ne gardant que des informations sur les médicaments anti-rétroviral. J'ai ensuite appliqué plusieurs fonction sur les listes pour nettoyer les données (supprimer les champs vides, ne choisir que les champs qui sont necessaires...)

#### Quels choix vous avez faits et pourquoi ?

J'ai choisi de ne prendre que les données conernant le sexe, le nom du pays, et les années. Les années qui comportent les données en % ont été mise dans un tableau **years** pour pouvoir les regroupées et y accéder comme un tableau.

#### Comment vous avez visualisé les données ? 

J'ai choisi d'utiliser [Chart.js](https://www.chartjs.org/) comme framework pour la visualisation. J'ai donc utiliser une balise canvas pour afficher les données. 

#### Une explication sur le choix du type de représentation ? 

J'ai pris le graphique de [type line](https://www.chartjs.org/docs/latest/charts/line.html) pour bien représenter l'evolution au fil des ans. Il me semblait aussi que c'etait le graphique le plus adapté pour optenir un maximum de visibilité avec les données.

#### Ce que vous souhaitez démontrer ?

Que l'accès aux medicaments anti-rétroviral n'est pas égal selon les pays et encore moins égal selon le sexe des individus. On peut aussi voir l'évolution de cette tendance à travers les dernières années. 

#### Le public cible ? 

Toute personne conernée par les problèmes de santé publique et d'égalité. 