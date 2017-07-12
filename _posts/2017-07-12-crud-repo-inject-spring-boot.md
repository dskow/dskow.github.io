---
layout: post
title: Injecting Crud Repo in Spring Boot App
---

# Injecting Crud Repo in Spring Boot App

This technique provides a clean solution to adding a database client connection to your Spring boot app.  It uses some maven dependencies, an interface file, an application.yml file, a model object, and some annotations.  Some databases that allow this technique are: mongo, elasticsearch, and fuseki.

Here are a list of spring boot [starters](http://docs.spring.io/spring-boot/docs/1.5.3.RELEASE/reference/htmlsingle/#using-boot-starter) that you can try.

### Dependency managment

For this example, I will get versions from the spring-boot-dependencies pom file by adding the following to my maven pom file.

	<properties>
		<spring-boot.version>1.5.4.RELEASE</spring-boot.version>
	</properties>
	
	<dependencyManagement>
		<dependencies>
			<dependency>
				<!-- Import dependency management from Spring Boot -->
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-dependencies</artifactId>
				<version>${spring-boot.version}</version>
				<type>pom</type>
				<scope>import</scope>
			</dependency>
		</dependencies>
	</dependencyManagement>
	<dependencies />
	
### Mongo client

Add the dependency for spring boot starter for mongo.

		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-data-mongodb</artifactId>
		</dependency>

		The propagation of this type of volume is rprivate.

Create a repository interface.  This interface will reference the Document model stored in that repository.  In this example PubmedArticle is used.  The Query annotations define custom queries in addition to the default ones provided from MongoRepository.

	import org.springframework.data.mongodb.repository.MongoRepository;
	import org.springframework.data.mongodb.repository.Query;
	import org.springframework.stereotype.Repository;

	@Repository
	public interface JournalRepository extends MongoRepository<PubmedArticle, String> {
		@Query("{'name': ?0 }")
		public List<PubmedArticle> findByName(String name);

		@Query("{'medlineCitation.article.abstractItem.abstractTexts': { $exists: true, $ne: null } }")
		public List<PubmedArticle> findAllAbstracts();
	}

Create a model class that is referenced in the repository interface.  The model class gives the name of the collection by setting the Document annotation.  In this example, the colletion name if Journals.

	import org.springframework.data.annotation.Id;
	import org.springframework.data.mongodb.core.mapping.Document;
	@Document(collection = "Journals")
	public class PubmedArticle {
	...
		@Id
		private String id;

		@JsonProperty("PubmedData")
		private PubmedDataEntity pubmedData = null;

		@JsonProperty("MedlineCitation")
		private MedlineCitationEntity medlineCitation = null;

Add the application.yml settings.  This file should go in /main/src/resources folder of your build.  The syntax ${envname:default} is how to pass in an override and also have a default value for each config item.   In this example, I have four envnames: mdriver, monhost, monport, and mondb. The default value is used it the corresponding envname is not set when running the spring boot application.  This only happens are startup and not while the application is running.

Here are the settings for mongo crud repository.

	spring:
	  datasource:
		driverClassName: ${mdriver:com.mongodb.Mongo}
	  data:
		mongodb:
		  uri: mongodb://${monhost:localhost}:${monport:27017}/${mondb:test}

Add the Autowire to your spring boot controller.  You create an interface for each collection in your repository.

	@Autowired
	JournalRepository journalRepo;
	
	@Autowired
	QueryRepository queryRepo;

Use the values in your code.  I show the custom query call findByName  which I just noticed is looking for an attribute call name in the journalRepo collection.  However, the PubmedArticle model does not have a name attribute.  So, this query would never return anything.  This shows that logical errors can still pop up without complaining.

	List<PubmedArticle> list = journalRepo.findByName(name);
	
	PubmedArticle journal = new PubmedArticle(article);
	jds.journalRepo.save(journal);

		  
### Elasticsearch Client

This is similar to the above except is uses a cluster to pass data between the client and the repository.

Add starter dependency.

	<dependency>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-data-elasticsearch</artifactId>
	</dependency>

Create a repository interface.

	import org.springframework.data.domain.Page;
	import org.springframework.data.domain.Pageable;
	import org.springframework.data.elasticsearch.annotations.Query;
	import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

	import com.securboration.stampede.elastic.Log;

	/**
	 * Holds the Elasticsearch CRUD operations for {@link Log} entity.
	 */
	public interface LogRepository extends ElasticsearchRepository<Log, String> {
		// see https://www.elastic.co/guide/en/elasticsearch/reference/current/common-options.html#date-math
		@Query("{\"range\" : {\"timestamp\" : {\"gte\" : \"now-60s\",\"lt\" : \"now-2s\"}}}")
		Page<Log> findByDate(Long timestamp, Pageable pageable);
	}

Create a document.

	import org.springframework.data.annotation.Id;
	import org.springframework.data.elasticsearch.annotations.Document;
	import org.springframework.data.elasticsearch.annotations.Field;
	import org.springframework.data.elasticsearch.annotations.FieldType;

	@Document(indexName = "log")
	public class Log {

		@Id
		private String id;

		@Field(type = FieldType.Date, store = true)
		private Date timestamp = null;

		private String format = null;

		private String messageType = null;

		private String messageIndex = null;

		private String messageText = null;

Set application.yml

	spring:
		data:
			elasticsearch:
				cluster-name: ${esname:elasticsearch}
				cluster-nodes: ${esnode:localhost:9300}
				repositories:
					enabled: ${esrepos:true}

Autowire the crud repo into your service.

	@Autowired
	LogRepository logRepo;

Use it.

		String msg = "This is elacticsearch";
		if (logRepo != null) {
			Log result = logRepo.save(new Log(Log.MessageType.TAGGER_EVENT, msg, Log.Formatting.BOLD));
			logRepo.index(result);
			logRepo.refresh();
		}


### Fuseki

Ok I could not find the crud version for fuseki.  But the auto inject is similar.  You'll have to manually create a the client. This example only uses a select query. In executeSelectQuery method(), it uses a jdk8 feature called lamda which have the arrow pointer in the code to pass an a processQuerySolution method from an internal interface.

Add Jena fuskei dependencies.
	
		<dependency>
			<groupId>org.apache.jena</groupId>
			<artifactId>apache-jena-libs</artifactId>
			<version>${jena.version}</version>
			<type>pom</type>
			<scope>compile</scope>
		</dependency>
		
		<dependency>
			<groupId>org.apache.jena</groupId>
			<artifactId>jena-core</artifactId>
			<version>${jena.version}</version>
			<scope>compile</scope>
		</dependency>


Create a FusekiClient class.

	import org.apache.jena.query.DatasetAccessor;
	import org.apache.jena.query.DatasetAccessorFactory;
	import org.apache.jena.query.Query;
	import org.apache.jena.query.QueryExecutionFactory;
	import org.apache.jena.query.QueryFactory;
	import org.apache.jena.query.QuerySolution;
	import org.apache.jena.query.ResultSet;
	import org.apache.jena.rdf.model.Model;
	import org.apache.jena.sparql.engine.http.QueryEngineHTTP;
	import org.apache.jena.sparql.engine.http.QueryExceptionHTTP;

	public class FusekiClient
	{
	  public void executeSelectQuery(
		  final String sparql,
		  final ResultSetProcessor processor
		  ) throws QueryExceptionHTTP
	  {
		try(QueryEngineHTTP query = createQuery(sparql))
		{
		  ResultSet result = query.execSelect();
		  
		  while(result.hasNext())
		  {
			QuerySolution solution = result.next();
			
			processor.processQuerySolution(solution);
		  }
		} 
	  }
	  
	  private QueryEngineHTTP createQuery(final String sparql)
	  {
		final Query query = QueryFactory.create(sparql);
		
		QueryEngineHTTP retVal =
			QueryExecutionFactory.createServiceRequest(
				fusekiServiceQueryUrl,
				query
				);

		if (timeoutMs != null) {
		  retVal.setTimeout(timeoutMs);
		}
		
		return retVal;
	  }
	  
	  public List<Map<String, String>> executeSelectQuery(final String sparql){
		List<Map<String, String>> solutions = new ArrayList<>();
		
		executeSelectQuery(
			sparql,
			(QuerySolution soln)->{
			  Iterator<String> varNames = soln.varNames();
			  
			  Map<String,String> solution = new HashMap<>();
			  solutions.add(solution);
			  while(varNames.hasNext()){
				String varName = varNames.next();
				solution.put(varName, soln.get(varName).toString());
			  }
			});
		
		return solutions;
	  }

	  public static interface ResultSetProcessor
	  {
		public void processQuerySolution(QuerySolution s);
	  }
	}

Autowire the client.

	private FusekiClient fusekiClient;

	@Autowired
	public void configureFusekiClient(@Value("${fuseki.endpoint}") String baseUrl, @Value("${fuseki.dataset}") String dataset) {
		fusekiClient = new FusekiClient(baseUrl + dataset);
	}

Use the client.

	fusekiClient.executeSelectQuery( queryString, (QuerySolution soln)->{
	  Iterator<String> varNames = soln.varNames();

	  while(varNames.hasNext())
	  {
		String varName = varNames.next();
	  }
	});

Add application.yml

	fuseki:
		endpoint: ${fusekEP:http://localhost:3030/}
		dataset: ${fusekiDS:ds}
   

	
