use meilisearch_sdk::{client::Client, errors::Error};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct SearchProduct {
    pub id: String,
    pub name: String,
    pub description: Option<String>,
    pub sku: String,
    pub price: f64,
    pub category: Option<String>,
    pub brand: Option<String>,
    pub in_stock: bool,
    pub image: Option<String>,
}

pub struct SearchService {
    client: Client,
    index_uid: String,
}

impl SearchService {
    pub fn new(host: &str, api_key: &str) -> Self {
        let client = Client::new(host, Some(api_key)).expect("Invalid Meilisearch Host URL");
        Self {
            client,
            index_uid: "products".to_string(),
        }
    }

    pub async fn initialize_index(&self) -> Result<(), Error> {
        let index = self.client.index(&self.index_uid);
        
        // Configurar atributos buscables (typo tolerance en estos)
        index.set_searchable_attributes(["name", "sku", "category", "brand", "description"]).await?;
        
        // Configurar atributos filtrables
        index.set_filterable_attributes(["category", "brand", "in_stock", "price"]).await?;
        
        Ok(())
    }

    pub async fn add_or_update_products(&self, products: Vec<SearchProduct>) -> Result<(), Error> {
        let index = self.client.index(&self.index_uid);
        index.add_documents(&products, Some("id")).await?;
        Ok(())
    }

    pub async fn delete_product(&self, product_id: &str) -> Result<(), Error> {
        let index = self.client.index(&self.index_uid);
        index.delete_document(product_id).await?;
        Ok(())
    }
}
