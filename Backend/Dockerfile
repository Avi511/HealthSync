FROM maven:3.9.9-eclipse-temurin-21 AS build

WORKDIR /workspace

COPY pom.xml .
COPY common-library/pom.xml common-library/pom.xml
COPY discovery-server/pom.xml discovery-server/pom.xml
COPY api-gateway/pom.xml api-gateway/pom.xml
COPY auth-service/pom.xml auth-service/pom.xml
COPY user-service/pom.xml user-service/pom.xml
COPY doctor-service/pom.xml doctor-service/pom.xml
COPY appointment-service/pom.xml appointment-service/pom.xml
COPY prescription-service/pom.xml prescription-service/pom.xml
COPY payment-service/pom.xml payment-service/pom.xml
COPY notification-service/pom.xml notification-service/pom.xml
COPY review-service/pom.xml review-service/pom.xml

RUN mvn -q -DskipTests dependency:go-offline

COPY . .

ARG MODULE
RUN mvn -q -pl "${MODULE}" -am -DskipTests package && cp "${MODULE}"/target/*.jar /workspace/app.jar

FROM eclipse-temurin:21-jre

WORKDIR /app
COPY --from=build /workspace/app.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
