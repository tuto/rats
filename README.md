# Herramienta simple y barata para GRANDES pruebas de carga 

## Motivación

Al momento de probar aplicaciones web existen muchas herramientas que se usan 
 - **apache ab**
 - **jmeter**
 - **soapui**
 - **curl**
 - **etc**

Todas ellas tienen un límite de ejecuciones en paralelo. Generalmente dados por la capacidad de hilos en paralelos del
computador donde se corren. Si necesitas mas procesamiento deberías pagar por ejemplo **blazemeter** u otra. Estas herramientas
en general no son baratas y los planes gratis son mas limitados que correrlas localmente.

## Solución propuesta

Muchas veces las pruebas de carga siemplemente son un post o get a algun endpoint durante un determinado tiempo, tantas veces en paralelo
Si ese es tu caso sigue leyendo por favor.

En este repositorio se presenta una solución(barata) para este tipo de problema usando el plan gratis de Google Cloud Plattform, el cuál posee 2 millones de ejecuciones mensuales gratis y regala 300 dolares por probar la plataforma.
Los pasos a seguir son: 

1. Crear una cuenta gratis en Google Cloud plattform(tienes 300 dolares para "jugar")
2. Crear una cuenta en mlab.com(tienes 500mb gratis) para almacenar los resultados de las pruebas
3. Crear un archivo .env.yaml con el siguiente formato
    ```
    MONGO_URI: URLQUETEDIOMLAB
    MONGO_USER: USERDEBDMLAB
    MONGO_PASS: PASSDEMLAB
    ```
4. Desplegar la funcion que se encuentra en el archivo index.js un numero de veces que quieras, yo cambiaba el exports.ratQueen por exports.ratQueen2 y podia
desplegar en todas las regiones de gcp nuevamente todas las ratas de la forma
(cloud functions deploy ratQueen --runtime nodejs10 --trigger-http --region us-central1 --allow-unauthenticated --memory=1024MB --timeout=120s --env-vars-file=.env.yaml)
5. Crear un script que te permita llamar a las funciones creadas variando los parámetros de entrada

## Parametros de entrada:

Un ejemplo de llamada sería **https://URLAFUNCTIONS.cloudfunctions.net/ratQueen?ratsNumber=2&loop=2&interval=2000&options=eyJ1cmwiOiJodHRwczovL3d3dy5nb29nbGUuY2wiLCAibWV0aG9kIjoiZ2V0In0=**

- **ratsNumber**: numero de ratas que va a crear la reina, esto quiere decir el número de hilos con los que esa reina le va a pegar al endpoint que le digas
- **loop**: esto quiere decir el numero de veces que la reina lanzara sus ratas sobre el endpoint
- **interval**: Cada cuanto tiempo va a lanzar la reina sus ratas sobre el endpoint
- **options**: Este es un string en base 64 de las opciones que [axios acepta](https://github.com/axios/axios#request-config) 

## Obtención de información

Este repositorio tambien contiene un archivo(getData.js) que te permite obtener la información de mlab y guardarla en un csv para por ejemplo dibujarla con
gnuplot.

## Resultados

He llegado a desplegar mas de 80 funciones cambiando el nombre y la ubicación. Con las cuales he podido llegar a testear aplicaciones con 100000tps. Todo esto sin ningun cobro. 

## Contributing

Sientete libre de modificar y enviar mejoras si te interesa. Esto fue una prueba de conceptos que nos sirvió mucho y quisimos compartir.
