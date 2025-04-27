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

// GET all products
export async function GET(request: NextRequest) {
  try {
    const products = readProducts();
    const userType = request.nextUrl.searchParams.get('userType') || 'all';
    
    if (userType === 'retailer') {
      // Return only retailer products that are approved
      const retailerProducts = products.filter(
        (product: any) => 
          product.seller.email !== 'anonymous@example.com' && 
          product.status === 'APPROVED'
      );
      return NextResponse.json(retailerProducts);
    } else if (userType === 'admin') {
      // Return all products for admin
      return NextResponse.json(products);
    } else {
      // Return only approved products
      const approvedProducts = products.filter(
        (product: any) => product.status === 'APPROVED'
      );
      return NextResponse.json(approvedProducts);
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST a new product
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { 
      name, 
      category, 
      price, 
      condition, 
      description, 
      imageUrl, 
      sellerName, 
      sellerEmail,
      userType 
    } = data;

    // Validate required fields
    if (!name || !category || !price || !condition || !description) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const products = readProducts();
    
    const newProduct = {
      id: uuidv4(),
      name,
      category,
      price: Number(price),
      condition,
      description,
      imageUrl: imageUrl || 'https://source.unsplash.com/random/800x600/?product',
      status: userType === 'retailer' ? 'APPROVED' : 'PENDING',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      seller: {
        name: sellerName || 'Anonymous',
        email: sellerEmail || 'anonymous@example.com'
      }
    };

    products.push(newProduct);
    
    if (writeProducts(products)) {
      return NextResponse.json(newProduct, { status: 201 });
    } else {
      return NextResponse.json(
        { error: 'Failed to save product' },
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
