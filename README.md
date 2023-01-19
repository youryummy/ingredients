# Microservicio Ingredients

## 1. El nivel de acabado al que nos presentamos es 10.

## 2. Una descripción de la aplicación
El microservicio ‘Ingredients’ se encarga de almacenar, así como de gestionar toda la información pertinente a los ingredientes de la aplicación, los cuales pueden ser añadidos como componentes de una receta.

## 3. La descomposición en microservicios indicando cuál es el implementado por la pareja.
La pareja Mariano Manuel Torrado Sánchez y Alejandro Santisteban Corchos han realizado los microservicios de Ingredients, Account y Gateway.

## 4. El customer agreement de la aplicación.
Se encuentra en la entrega del proyecto.

## 5. El análisis de la capacidad y la justificación de la determinación del coste de cada plan en base a este (para nivel hasta 7 puntos en adelante)
Se encuentra en la entrega del proyecto.

## 6. Una descripción del API REST del microservicio.

* GET /api/v1/ingredients: Con esta llamada se obtienen todos los ingredientes que existan en la base de datos de forma paginada y haciendo uso de caché, además de admitir los parámetros de búsqueda de “page”, “limit”, “created_by” y “search”. 
  
* POST /api/v1/ingredients: Con esta llamada se crea un nuevo ingrediente, siempre y cuando se pasen los datos necesarios en el cuerpo de la petición. Tanto esta como el resto de llamadas que se van a comentar a continuación implementan la funcionalidad de Circuit Breaker. 

* GET /api/v1/ingredients/{ingredientId}: Dado un id de un ingrediente, se obtienen todos sus datos y se muestran en formato JSON. 
  
* PUT /api/v1/ingredients/{ingredientId}: Dado un id de un ingrediente, se actualizan los valores de sus propiedades con los datos que se pasen por el cuerpo de la llamada. 

* DELETE /api/v1/ingredients/{ingredientId}: Dado un id de un ingrediente, se elimina dicho ingrediente de la base de datos. 

## 7. Por cada uno de los requisitos del microservicio, una justificación decómo se ha ido consiguiendo. En donde aplique, la justificación debe incluir detalles sobre el sitio del código donde se puede encontrar evidencias de esa implementación.
Se encuentra en la entrega del proyecto.

## 8. Análisis de los esfuerzos (en horas) dedicadas por cada uno. Para esto se recomienda utilizar una herramienta de time tracking como Clockify o Toggl.
Se encuentra en la entrega del proyecto.
