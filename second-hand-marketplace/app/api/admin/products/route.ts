import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'products.json');

// Helper function to read products
function readProducts() {
  try {
    const data = fs.readFileSync(DATA_FILE_PATH, 'utf8');
    return JSON.parse(data).products;
  } catch (error) {
    console.error('Error reading products:', error);
    return [];
  }
}

// Helper function to write products
function writeProducts(products: any[]) {
  try {
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify({ products }, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing products:', error);
    return false;
  }
}

// POST to create a new product
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { name, category, price, condition, description, imageUrl } = data;

    // Validate required fields
    if (!name || !category || !price || !condition || !description) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const newProduct = {
      id: uuidv4(),
      name,
      category,
      price: Number(price),
      condition,
      description,
      imageUrl,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const products = readProducts();
    products.push(newProduct);

    if (writeProducts(products)) {
      return NextResponse.json(newProduct);
    } else {
      return NextResponse.json(
        { error: 'Failed to create product' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}

// PUT to update product status
export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    const { productId, status } = data;

    if (!productId || !status) {
      return NextResponse.json(
        { error: 'Product ID and status are required' },
        { status: 400 }
      );
    }

    const products = readProducts();
    const productIndex = products.findIndex((p: any) => p.id === productId);

    if (productIndex === -1) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Update the product status
    products[productIndex].status = status;
    products[productIndex].updatedAt = new Date().toISOString();

    if (writeProducts(products)) {
      return NextResponse.json(products[productIndex]);
    } else {
      return NextResponse.json(
        { error: 'Failed to update product' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

// DELETE to remove a product
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('id');

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    const products = readProducts();
    const filteredProducts = products.filter((p: any) => p.id !== productId);

    if (products.length === filteredProducts.length) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    if (writeProducts(filteredProducts)) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: 'Failed to delete product' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
