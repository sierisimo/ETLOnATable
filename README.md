# ETL On A Table (v0.1.0)

<br><br><br><br><br><br><br><br><br>
# Sinuhe Jaime Valencia
# Erick Fernando Rivas Colunga

# Mineria de Datos

#Tarea 4
<br><br><br><br><br><br>


[TOC]

## Introducci&oacute;n

### Proyecto

**ETL On A Table** es un proyecto escrito principalmente en JavaScript con Node.js que hace la busqueda de una tabla en internet [en la wikipedia](https://en.wikipedia.org/wiki/Highest-income_metropolitan_statistical_areas_in_the_United_States) y la almacena en una base de datos en SQLite3. Posterior a su almacenamiento, hace la transformaci&oacute;n de los datos con unos ciertos pasos a seguir:

1. Consulta la siguiente página https://en.wikipedia.org/wiki/Highest-income_metropolitan_statistical_areas_in_the_United_States
2. Los datos que se trabajaran son la tabla con el título "Metropolitan statistical areas ranked by median household income"
2. Los títulos de la tabla no deberán ser considerados en la solución.
3. Las columnas Rank, Population y Median, deberán ser numéricas.
3. Dividir la columna "Metropolitan Statistical Area" eligiendo el delimitador coma (,) de la derecha.
4. Repetir el paso 5 para la segunda parte de la columna dividida, en este caso el delimitador será el espacio más a la derecha.
4. Borrar la segunda columna generada en el paso 6 y la primera renombrarla a State.
5. La primer columna generada en el paso 5, renombrarla como Area.
5. Renombrar la columna "Median Household Income" como Median.

Como adicional a esto, se espera cumplir con otros puntos que muestren los resultados de la transformaci&oacute;n:

1. Generar una gráfica de dispersón (Scatter chart) con los datos de los campos Median, Population, Rank y State. El campo State servirá como leyenda.
1. En otra gráfica, seleccionar los campos Population y State para generar un mapa (coloreado de preferencia) que tenga el campo State como leyenda.
1. Presentar el reporte o gráficas como resultado del proceso.

## Implementacion

El proyecto consiste un monton de codigo JavaScript que hace la funci&oacute;n de ir a internet a buscar la informaci&oacute;n del sitio, obtenerla desde el html, transformala en JSON y despues almacenarla en un archivo de nombre `metropolitan.sqlite3`.

### Fetch

Existe un intervalo de tiempo configurable que funcionara como el valor de actualizacion. Este valor se pasara por linea de comandos para indicar cada cuantos minutos se espera hacer la actualizaci&oacute;n de los datos. De no pasar un numero valido que represente los minutos que se esperan como rango de actualizacion, se tomara como valor de actualizacion un dia (es decir, 60 minutos * 24 horas).

### Traduccion de datos

La manera en que se trabaja el proyecto es buscando la tabla html del sitio web y posteriormente extrayendo cada dato del tag ```<tbody>``` que representa la tabla.

## Instalacion

### Requerimientos

* Node.js. Es necesario contar con la ultima version de [Node.js](www.nodejs.org) para poder ejecutar el programa.
* npm. Aunque se incluye dentro de la instalacion de node.js, es necesario comprobar que se cuente con node.
* sqlite3. La version mas reciente de SQLite.

### Instalacion de dependencias

Para empezar a usar el programa, se necesita descargar y posteriormente instalar las depencdencias con npm, esto se realizar escribiendo:

```
npm install
```

depues de haberse posicionado en la ubicacion del proyecto descomprimido.

Con esto se instalan todas las librerias y dependencias que vienen no vienen incluidas en el programa (se requiere de internet).

## Inicio del programa

Para empezar a correr el programa que se encargara de la busqueda de los datos, escribiremos (despues de posicionarnos en la raiz de nuestro programa):

```
npm start <tiempo>
```

Donde ```<tiempo>``` representa un numero entero, por ejemplo:

```
npm start 20
```

indica que se espera que el programa busque por nuevos datos cada 20 minutos.

### Ejemplo de corrida

```bash
[sierisimo@Porygon] ~/git/ETLOnATable (feature/graphs) ⚡ 
❯ npm start 5                                                                                                      ⏎

> etl-on-a-table@0.1.0 start /home/sierisimo/git/ETLOnATable
> DEBUG=* node app.js "5"

  app Program started at: +0ms Tue Oct 27 2015 23:29:51 GMT-0600 (CST)
  app Launching for new data +5m
  fetcher Called for a fetch. +1s
  fetcher Checking the fetched data... +3s
  fetcher Data fetched, <tbody> found! +48ms
  fetcher Sending data to parse... +1ms
  parser Data is ready, calling to parse +8ms
  parser Parsing finished! +224ms
  db:etl Ready to write to OLTP... +0ms
  db:etl Writed to OLTP +28ms
  db:etl Extracting the data... +1ms
  db:etl Transforming information... +40s
  db:etl Data transformed +23ms

```

## Detener el programa

Para detener el programa, solo basca con usar la convinacion de teclas ```CTRL + C``` o cerrar la terminal donde se esta utilizando.

## Datos

La corrida de los datos hara una insercion o reemplazo (`INSERT OR REPLACE`) dentro de la base de datos, los datos se mostraran:

```
1|San Francisco–Oakland–San Jose, California CMSA|7239362|63024
2|New York–Northern New Jersey–Long Island, New York–New Jersey–Connecticut–Pennsylvania CMSA|21199865|59799
3|Washington–Baltimore, District of Columbia–Maryland–Virginia–West Virginia CMSA|7608070|57291
4|Anchorage, Alaska MSA|260283|56787
5|Minneapolis–St. Paul, Minnesota–Wisconsin CMSA|3615902|54304
6|Boston–Worcester–Lawrence, Massachusetts–New Hampshire–Maine–Connecticut CMSA|5819101|52792
7|Hartford, Connecticut MSA|1183110|52188
8|Atlanta, Georgia MSA|4112198|51948
9|Honolulu, Hawaii MSA|876156|51914
10|Rochester, Minnesota MSA|124277|51316
11|Denver–Boulder–Greeley, Colorado CMSA|2581506|51088
12|Chicago–Gary–Kenosha, Illinois–Indiana–Wisconsin CMSA|9157540|51046
13|Bloomington–Normal, Illinois MSA CMSA|150433|50795
14|Seattle–Tacoma–Bellevue, Washington CMSA|3554760|50733
15|New London–Norwich, Connecticut–Rhode Island and Providence Plantations MSA|293566|49283
16|Madison, Wisconsin MSA|726526|49223
17|Detroit–Ann Arbor–Flint, Michigan CMSA|5456428|49160
18|Austin–San Marcos, Texas MSA|1249763|48950
19|Raleigh–Durham–Cary, North Carolina MSA|1187941|48845
20|Fort Collins–Loveland, Colorado MSA|251494|48655
...
```

Y estaran almacenados dentro de una base de datos que se encuentra a nivel del proyecto: `metropolitan.sqlite3`

La tabla que se usa para el almacenamiento de la tabla de wikipedia es: `metropolitan_statistical_by_income`

### DDL

El `Schema` que se crea para la base de datos es visible desde la carpeta `sql` y en el archivo `DDL`, a continuacion se muestra el contenido de este archivo:

```SQL
BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS metropolitan_statistical_by_income(
  rank INTEGER PRIMARY KEY,
  metropolitan_statistical_area TEXT NOT NULL,
  population NUMBER NOT NULL,
  median_household_income NUMBER NOT NULL
);

CREATE TABLE IF NOT EXISTS metropolitan_transformed(
  rank INTEGER,
  population NUMBER,
  state TEXT,
  area TEXT,
  median NUMBER
);

COMMIT;
```

### ETL

El proceso de ETL se almacena en la tabla `metropolitan_transformed`, a continuacion un ejemplo del final de estos datos:

```
...
250|129749||Texarkana|32238
251|242628|Texas|Lubbock|32198
252|160026|Arizona|Yuma|32182
253|147250|Louisiana|Monroe|32047
254|132008|Ohio–West Virginia|Steubenville–Weirton|31982
255|258916|Florida|Ocala|31944
256|203171|California|Chico–Paradise|31924
257|112249|Alabama|Anniston|31768
258|480091|Tennessee–Virginia|Johnson City-Kingsport–Bristol|31596
259|217955|Florida|Gainesville|31426
260|84278|Arkansas|Pine Bluff|31327
261|110156|Virginia|Danville|31201
262|103459|Alabama|Gadsden|31170
263|679622|Texas|El Paso|31051
264|385647|Louisiana|Lafayette|30998
265|111674|Mississippi|Hattiesburg|30981
266|115092|Alabama|Auburn–Opelika|30952
267|102008|Maryland-West Virginia|Cumberland|30916
268|232621|Pennsylvania|Johnstown|30442
269|153172|West Virginia–Ohio|Wheeling|30335
270|126337|Louisiana|Alexandria|29856
271|174682|New Mexico|Las Cruces|29808
272|315538|West Virginia–Kentucky–Ohio|Huntington–Ashland|29415
273|152415|Texas|Bryan–College Station|29104
274|193117|Texas|Laredo|28100
275|335227|Texas|Brownsville–Harlingen–San Benito|26155
276|569463|Texas|McAllen–Edinburg–Mission|24863
277|2450292|Puerto Rico|San Juan–Caguas–Arecibo|16203
278|253347|Puerto Rico|Mayagüez|12707
279|361094|Puerto Rico|Ponce|12505
280|146424|Puerto Rico|Aguadilla|11385

```


## Contacto

Para quejas, reclamos, recomendaciones visitar: https://github.com/sierisimo/ETLOnATable o contactar a [sierisimo@gmail.com](mailto:sierisimo@gmail.com)