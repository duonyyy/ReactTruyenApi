import { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { Card, Container, Row, Col, Button, Badge } from 'react-bootstrap';

function Home() {
  const [getdata, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://otruyenapi.com/v1/api/home');
        console.log('API Response:', response.data);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Handle case where `getdata` or its nested properties are missing
  const seoTitle = getdata?.data?.data?.seoOnPage?.titleHead || 'Default Title';
  const description =
    getdata?.data?.data?.seoOnPage?.descriptionHead ||
    'No description available.';

  const items = getdata?.data?.data?.items || []; // Assuming API has `items` array

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
      </Helmet>
      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <p>{description}</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Dynamic Cards */}
        <Row className="mt-4">
          {items.length > 0 ? (
            items.map((item, index) => (
              <Col key={index} md={4} className="mb-4">
                <Card>
                  <Card.Img
                    variant="top"
                    src={`https://img.otruyenapi.com/uploads/comics/${item.thumb_url}`}
                    alt={item.name || 'Card Image'}
                  />
                  <Card.Body>
                    <Card.Title>{item.name || 'No Title'}</Card.Title>
                    <Card.Text>Updated At: {item.updatedAt || 'N/A'}</Card.Text>
                    <Card.Text>
                      {item.category && item.category.length > 0 ? (
                        item.category.map((cat, idx) => (
                          <Badge bg="info" key={idx} className="me-1">
                            {cat.name}
                          </Badge>
                        ))
                      ) : (
                        <Badge bg="secondary">Others</Badge>
                      )}
                    </Card.Text>
                    <Button variant="primary">View Details</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p>No items available.</p>
          )}
        </Row>
      </Container>
    </>
  );
}

export default Home;
